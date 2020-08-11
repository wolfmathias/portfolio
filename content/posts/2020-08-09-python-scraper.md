---
template: SinglePost
title: From Rails to Python
status: Draft
date: '2020-08-09'
featuredImage: ''
excerpt: >-
  First Python script
categories:
  - category: Tech Blog
---

# Switching to Python

I decided it was time to start my Python journey. I had a few courses on Udemy lined up that I had been planning on, so I loaded them up and dove in. It wasn't long (a few hours) before I started playing around on my own.

I work at Costco while I program in my time off. While it's a fine job, my schedule changes constantly. To save myself the trouble of needing to check my schedule every week, I figured it was time to write a script to grab my schedule every day from the employee website.

I'll dive right in. 

I'm using `requests` to handle my GET and POST requests. I'm also using [BeautifulSoup](), a module that inludes methods to select HTML elements from a page. After installing both (using `pip3 install bs4` for example), I can import and use them.

```
import requests 
from bs4 import BeautifulSoup
```

I want to make sure that all of my requests are seen as being in the same session by the server. I set this in a pointer to use for the rest of my script with `session = requests.Session()`.

Using this session, I then call on a method provided by BS to give me the HTML document:

```
page = BeautifulSoup(session.get('https://ess.costco.com/').text, 'html.parser')
SAML_TOKEN = page.input['value']
```

Above, I'm calling `BeautifulSoup`, provided by the library of the same name, and passing it two arguments: the first is the page I am making the GET request to, in this case the website for employees to login. The second is the parser I want BS to use.

Once I have my HTML page, I call on BS4's `input` method to find an input element and grab the value. I'm doing this so I can get an auth token that will be used in my next POST request.

```
# Send POST request to "https://login.costco.com/idp/SSO.saml2"
url = "https://login.costco.com"
payload = { "SAMLRequest": SAML_TOKEN }

# res will be the HTML of the login page
res = session.post(url + '/idp/SSO.saml2', payload)
page = BeautifulSoup(res.text, 'html.parser')
```

You can see I'm doing a similar thing as before: sending a request and using the provided methods to grab the information I need from the response after parsing it as HTML. The above gives me a login form. I can see the action of this form, so I grab that action and send the required parameters:

```
route = page.form['action']
payload = {
    "pf.username": COSTCO_USERNAME,
    "pf.pass": COSTCO_PASSWORD
}

# Send login request
# Response is a page with another SAML token, grab that and send back
# This action doesn't include 'https://costco.com', append route to url
res = session.post(url + route, payload)
page = BeautifulSoup(res.text, 'html.parser')
```

I can see a pattern starting to develop. At this point, it would be prudent to abstract some of this into my own methods to DRY up my code. I could even use object orientation to write my own module that handles some of this.

You'll notice that SAML token being passed back and forth. This work is normally handled by some JavaScript scripts, but since I'm not using a browser, I am doing that work manually.

This is passed around a few times in lieu of JS scripts, and finally I receive an error from the Costco server. In order for me to properly authenticate, I'm going to need to use my browser instead of just sending some GET and POST requests.

Luckily, Selenium includes a suite of tools to control my browser. I can use those to fill out the login form and navigate to the pages I need. I'll download that and try again.