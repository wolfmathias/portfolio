---
template: SinglePost
title: Using 'resolve' in package.json
status: Draft # still showing on blog even though unpublished, probably wrong value
date: '2020-06-08'
featuredImage: 
excerpt: 
categories:
  - category: Tech Blog
---
## I received the following error when running 'gatsby develop' one day:
(picture of error)

>Apparently a common break when using GraphQL in a Node.js environment

This was a strange break, mostly because I didn't even do anything to cause it (I think).

The day before, I had been editing the site and pushing changes just fine. I was surprised when I went to start up the development server the next day and couldn't get it to work. Nothing changed, so why did it break?

Running `gatsby develop` normally creates a development build and starts the server, at which point I can navigate to 'localhost:8000/' and see all my changes. This time, I received an error. The message provides a [link](https://yarnpkg.com/en/docs/selective-version-resolutions), which goes over using "resolutions" to control the versions your dependencies are using.

### Find the dependency and the version to use

So, this error is happening because there are two different versions of GraphQL somewhere in our node_modules. That's no good, so development is stopped and we're told to fix it. [This StackOverflow page](https://stackoverflow.com/questions/51990179/run-postgraphile-with-npm) provided me with almost exactly what I needed.

We need to add the following (with the actual verion) to our package.json file:
```
"resolutions": {
  "graphql": "0.12.x"
}
```

This will tell NPM or Yarn to only use the specified version and ignore any others that made it's way in.

The dependencies installed can be found in 'package-lock.json'. Looking through the versions, I see `graphql": "^14.6.0`.

Simply, all I need to do is throw that version number into the code I previously copied. Let's see if that works.

### Add 'resolutions' 

In 'package.json'
```
  "dependencies": {
    "@reach/router": "^1.2.1",
    ... others
  },
  "resolutions": {
    "graphql": "^14.6.0"
  },
  "keywords": [
    "gatsby"
  ],
```

Now, running `gatsby develop` in the terminal starts up the development server like normal!

