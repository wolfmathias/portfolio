---
template: SinglePost
title: Docker Compose
status: Published
date: '2020-10/11'
featuredImage: ''
excerpt: >-
  Building the first app with Django
categories:
  - category: Tech Blog
---

This week's progress has me building the first models and URL patterns in one of many smaller applications that make up the main webapp.

The two main models I'm starting with are User and Animal, for now User is residing within the 'models' file that also holds the Animal model. This'll be refactored into its own app with URL patterns and views to go with it.

```
from django.db import models
from django.utils import timezone
import datetime

class User(models.Model):
    first_name = models.CharField(max_length=24, default='test')
    last_name = models.CharField(max_length=24, default='test')
    email = models.EmailField(max_length=32, default='test')
    keeper = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return (f'{self.first_name} {self.last_name}')

class Animal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=24, default='test')
    species = models.CharField(max_length=72, default='test')
    bio = models.CharField(max_length=180, default='test')
    
    # Returns <Animal: 'name'> instead of <Animal: Animal object (n)> when calling object
    def __str__(self):
        return self.name
```

This is modeled following the official Django docs. We're creating a class that is extending Django's models, which are built by passing `models.Model` as the argument. We can use methods like `models.CharField` to build attributes for the model we're creating.

