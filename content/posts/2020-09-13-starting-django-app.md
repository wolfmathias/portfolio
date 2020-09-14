---
template: SinglePost
title: Building a Django App to Deploy to a Docker Container
status: Published
date: '2020-09-13'
featuredImage: ''
excerpt: >-
  Change of pace to building with Django
categories:
  - category: Tech Blog
---

While still working on [restorewolves.com](www.restorewolves.com), I switched gears to get a start on building with Django, a web development framework for Python.

I decided I wanted the web app in a Docker container that I can deploy to AWS. 

First, I made a new directory with `mkdir django-wildwish`, then moved into that new directory with `cd $_` (simple stuff, I know).

It's important to create a virtual environment with everything I need to properly put this in a Docker container. The instructions I was following used the command `virtualenv --python=python3 env --no-site-packages`. This will create a virtual environment, telling the command to use Python 3 for the Python version, naming the environment 'env'. 

This didn't exactly work for me, I ran into a few errors. Searching StackOverflow and a few other resources tells me that this method has been deprecated and to use Python's built in `venv` instead of using `virtualenv`, which is a module that had to be installed with pip.

`python -m venv env` will create a virtual environment with the name 'env'. 

Once the environment is created, we need to activate it with `source env/bin/activate`. Now we're operating in the virtual environment and can install the modules we'll be using in the project.

From here, I installed Django with `pip3 install django`. This successfully runs, but I run into issues when trying to use Django's included command to start a new project.

`django-admin startproject wildwish` would normally create all the directories and the structure I need to start building. However, I get some errors with this.

Some hours of troubleshooting later, I moved past one error but am running into another one related to my $PATH. This might take some time to figure out. Time to reach out to Python devs for help!