---
template: SinglePost
title: 'WildWish: Building the login form'
status: Draft
date: '2020-06-20'
excerpt: Building a login form
categories:
  - category: Tech Blog
meta:
  noindex: false
---
I wanted the login form to be simple and give the option for users to login with an Oauth provider. 

![Picture of login form component](https://ucarecdn.com/63911b75-5090-4fe3-9110-2b87a8b90c7d/ "Login Form")

Thinking about the form step by step, I need to:
- Capture the email and password fields and set the form's state
- Pass those as arguments to `loginUser()`
- Send them via a POST request to the route '/users/login'
- Authenticate the user and return that user object
- Set the user in the App's state using Redux
- Set the user in the current browser session so the user stays logged in

Easy. 

First, let's take a brief look at authenticating with Google and Facebook.

The Google and Facebook login buttons are components provided by '[react-google-login](https://www.npmjs.com/package/react-google-login)' and '[react-facebook-login](https://www.npmjs.com/package/react-facebook-login)'.

The components each accept various props. For now, I'll stick with some simple props as I build the component:

```
                <GoogleLogin 
                    clientId={GOOGLE_OAUTH_ID}
                    buttonText="Continue with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br />
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    textButton="Continue with Facebook"
                    size="medium"
                    fields="name,email"
                    callback={responseFacebook} 
                />
```

During development, my environment variables are being stored in `.env` as `REACT_APP_DEV_GOOGLE_OAUTH_ID = "12345-blablabla.apps.goggleusercontent.com"`, which is included in `.gitignore`. I'm accessing these by declaring them as constants, such as: `const GOOGLE_OAUTH_ID = process.env.REACT_APP_DEV_GOOGLE_OAUTH_ID;` (This isn't secure and is only being done this way during development, I'll need a different solution in production.)

I'll go more into how this is working in another post.

I've written the component itself as a functional component and use hooks to take care of the form's state instead of using a class component. Though to be honest I may rewrite it as a class component, I had to write it with a lot of boilerplate and doing so would be a simple way to dry it up. I'll write another post about writing it with hooks vs without.

I'm using MaterialUI's 'TextField' and 'Button' components to build the form:

```
                <form name="login" onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        required onChange={handleEmailChange}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        required
                        onChange={handlePasswordChange}
                        style={{ marginTop: 10 }}
                    />
                    <Button type="submit" color="primary" variant="outlined">
                        Submit
                    </Button>
                </form>
```

I'm passing 'handleSubmit' as the form's 'onSubmit' prop, written as:

``` 
    const handleSubmit = (event) => {
        event.preventDefault();

        if (email && password) {
            props.loginUser(email, password);
        }
    }
```
I'm importing 'loginUser()' and using Redux to connect everything together. I'll go into how that's all working later.
 
I also have a conditional to make sure that both the 'email' and 'password' fields are present before calling 'loginUser'. These are declared earlier in the function and I'm using hooks to set them as my component's state:

```
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
```
(I'll write later about using these React hooks.)

With the skeleton of the form built, I'll need some logic to actually handle logging in a user. Let's do this.

[Check out the file on GitHub](https://github.com/bigcatplichta/wildwish-react-mui/blob/master/src/components/Login.js)


