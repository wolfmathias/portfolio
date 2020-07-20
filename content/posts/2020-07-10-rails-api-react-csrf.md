---
template: SinglePost
title: Rails as an API, Devise, and CSRF Tokens
status: Draft
date: '2020-07-10'
featuredImage: ''
excerpt: >-
  The problems, and some solutions, I ran into when building with Rails and Devise
categories:
  - category: Tech Blog
---
# Rails, React, and CSRF 

The internet is a great tool to find answers, but it can be difficult to find what you need for your exact situation, and it's very easy to get lost down a rabbit with something that isn't even tackling the problem you're actually having.

While building the login form for WildWish, I ran into errors with authentication. I would send a POST request to `/users/sign_in`, and the server would return `422 Unprocessable Entity`. Here is the error itself:

```
Started POST "/users/sign_in" for ::1 at 2020-07-11 12:46:33 -0600
Processing by Devise::SessionsController#create as JSON
  Parameters: {"email"=>"test", "password"=>"[FILTERED]", "session"=>{"email"=>"test", "password"=>"[FILTERED]"}}
HTTP Origin header (http://localhost:3000) didn't match request.base_url (http://localhost:3001)
Completed 422 Unprocessable Entity in 1ms (ActiveRecord: 0.0ms)



ActionController::InvalidAuthenticityToken - ActionController::InvalidAuthenticityToken:

```

I had already been POSTing to the server when creating new animals, so I was surprised to see this error. `HTTP Origin header didn't match request.base_url` is related to Cross Origin Resource Sharing. During development, I configured my app to allow requests from any domain. Again still, I had already been making requsts when creating animals with no issue. 

`ActionController::InvalidAuthenticityToken - ActionController::InvalidAuthenticityToken:` is related to CSRF tokens (Cross Site Resource Forgery). Rails automatically creates a token and stores it in the session, then includes these in the views it generates in a meta tag. In the Rails view, they're written in ERB as `<%= csrf_meta_tags %>`. This creates <meta> tags in the page's HTML, for example:

```
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="J/gw2ePXHS9Z1SUSSeUQgMmPhsPEFlFbMrLTLFHLfKjeWh7g4uyOnBlfKnlZlmCBiALDWdDWCSo1z0tybGVtfA==" />
```

I'm building a single page app with React and using not using any of the Rails views, all my rendering is being done client side. There are a few options I have here.

## Put the token in a cookie

I can use helper methods provided by Rails (ie. `form_authenticity_token`) to set the token inside a cookie (or set in the client's local storage), then the client would need a method to grab that from the cookie and include it in the request header when making a request.

`cookies[:csrf_token] = authenticity_token` would easily do it. This could be set in `ApplicationController` and be triggered at the very first request.

My front end application then needs to grab that token from the cookie and store it to use when sending requests.

Something like this:

```
let authToken = browser.cookies.get('csrf_token')

// fetch request uses LOGIN_OPTIONS for first argument
const LOGIN_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        'Auth-Param': authToken
    },
    body: JSON.stringify({ email, password })
}
```

## Disable forgery protection

Other Rails methods let me disable setting the token by calling them inside `ApplicationController`.

Another simple and easy method, `skip_before_action :verify_authenticity_token` just needs to be inserted into the top of the controller. All other controllers inhertit from this, so we'll skip the token throughout the app. 

```
class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  # Other actions and methods
  #
end
```

## Use Rails API mode

It seems that setting Rails to initialize in API only mode gets rid of a lot of other functionality. Making `ApplicationController` inherit from `ActionController::API` instead of the `Base` module means the controller that handles authentication isn't initialized, as well as a host of others. 

However, if I want to use cookies for anything (like a JWT token), I need to make sure that controller is instantiated with the application so I use the methods provided with it.

## Have the Rails application serve my React components

This is another option I found, and will need quite a bit of refactoring to happen. I like the separation of concerns with separate front and backends anyway, so I'll wait on playing with this.

## Actual Solution

Even with API only, I was still running into the same issue, but only for users. Turns out, Devise inherits from the Base module automatically, so the solution was to change that to API.

This is done in the Devise initializer:

```
Devise.setup do |config|

  config.parent_controller = 'ActionController::API'

end
```

Easy! Now I don't have to worry about that csrf token being missing. I'll use JWT Tokens anyway.

