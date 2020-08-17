---
template: SinglePost
title: Python Schedule Scraper
status: Published
date: '2020-08-15'
featuredImage: ''
excerpt: >-
  First Python script
categories:
  - category: Tech Blog
---

# More Python Scraping!

After running into issues with authenticating while scraping, I decided to use Selenium to sign in and get to the page I need. Since Selenium controls the browser to provide automated testing, I could use this to bypass the issues I had been running into before. Using the browser this way will allow the JS scripts to run and pass the SAML responses back and forth.

```
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from creds import COSTCO_USERNAME, COSTCO_PASSWORD

browser = webdriver.Chrome()

# Try methods for up to 10 seconds before throwing exception
browser.implicitly_wait(10)

# Go to page with login link
browser.get('https://www.costco.com/employee-website.html')
link = browser.find_element_by_link_text('Login')
link.click()

# Link is opened in a new tab, so switch to that tab
browser.switch_to.window(browser.window_handles[-1])

# Find the login form fields
username = browser.find_element_by_id('username')
password = browser.find_element_by_id('password')

# Enter the needed info in the fields
username.send_keys(COSTCO_USERNAME)
password.send_keys(COSTCO_PASSWORD)

# Submit the form
password.submit()
```

I love how simple this all is! I don't even need to describe what I'm doing any further.

From here, I need to click on the link that will take me to the schedule. 

I know the elements ID, as well as the xpath, but currently get a NoElementLocated error. Printing out the page shows that the HTML is not exactly what I'm seeing in the browser. I think this has something to do with it being an old portal system. 

I'll do more debugging and see what the solution is!