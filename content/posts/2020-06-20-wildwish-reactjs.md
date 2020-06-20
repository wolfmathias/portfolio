---
template: SinglePost
title: WildWish React SPA
status: Published
date: '2020-06-15'
featuredImage: ''
excerpt: >-
  Current build of WildWish.org
categories:
  - category: Projects
---
>My passion project and the reason I started learning programming.

![](/)

# A mobile first web app and donation platform.

The idea for this app was born from a need to innovate how I raise money and help animals with the WildHeart Foundation. I wanted an application that featured individual animals and allowed people to donate to that specific animal. I also wanted the donation and fund distribution to be automated: when a donation comes in, it is earmarked for that specific animal and the toy that is sent is selected from a list that was pre-approved by the zoo. I also wanted a web app that stood out from the thousands of other "Donate" pages on the internet and gave me something unique to advertise.

You can look back at my previous projects to see how the different iterations of this app taught me programming, [starting with a command line app written in Ruby.](/posts/cli-toy-browser-tool/)

I selected Google's Material-UI library to build with, as this library provides a modern design and plenty of support from the community.

Zookeepers are able to create profiles for each of the animals they take care of, and select a list of toys appropriate for them. The animals are displayed on the front page to users, who can view more about that animal or donate.

The app works with the API provided by my [Ruby on Rails application](/posts/wild-wish-backend/).
Redux is used to manage state.

[Check out the repo on GitHub.](https://github.com/bigcatplichta/wildwish-react-mui)