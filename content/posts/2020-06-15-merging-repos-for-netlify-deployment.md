---
template: SinglePost
title: Merging Repos for Netlify Deployment
status: Draft
date: '2020-06-15'
featuredImage: ''
excerpt: >-
  Merging repos for Netlify
categories:
  - category: Tech Blog
---
>It's expected to make mistakes when learning. Let's fix them.

Okay. I have a problem I need to solve. At least I'm the one who create the problem.

When making this site, I used the "Deploy to Netlify" button on a template site. This was stupid easy to do, and I was learning what I doing just after I actually did it. Because of this, it was difficult to plan ahead and I made changes that I now need to reverse.

# Origin

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/thriveweb/yellowcake&stack=cms)

That little button does so much! By clicking it, a new repository was created on my GitHub. This repo was then linked to my Netlify and a new app built and deployed to a domain that was also created in this process.

The app uses Netlify's CMS to create and update content. By navigating to 'mattplichtawild.com/admin', I can login using Netlify Identity. Here I can add new posts, create pages, and upload media (which utilizes a CDN to store and deliver the files). I can simply write some content and click "Publish". This creates a new file and pushes the changes to the repo that was created. Continuous deployment means that Netlify automatically creates a new build when the main branch is updated.

This all relies on Git Gateway. The repository for Git Gateway is set when creating the site for the first time with that button above.

# The Problem

