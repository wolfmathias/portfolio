---
template: SinglePost
title: Docker! Docker! Docker!
status: Published
date: '2020-09-20'
featuredImage: ''
excerpt: >-
  First steps into Docker containers.
categories:
  - category: Tech Blog
---

A Dockerfile lives in the project repo and contains commands that the Docker daemon will use to build an image of the project.

The commands are run line by line, the result of each being committed to a new image. Each line is structred as a single word command, followed by arguments.

My Dockerfile looks like this:

```
# Use Python3.8 image
FROM python:3.8

# Sets dumping log messages directly to stream instead of buffering
ENV PYTHONUNBUFFERED 1

# Use pipenv to manage packages
RUN pip install pipenv

# Create project directory and use
ENV PROJECT_DIR /usr/local/src/django-wildwish

WORKDIR ${PROJECT_DIR}

# Get dependencies
COPY Pipfile Pipfile.lock ${PROJECT_DIR}/


RUN pipenv install --system --deploy
```

We're telling Docker to get the image of Python from its Python3.8 official image. Then getting our dependencies set up.

When running the command `docker build -t <mattplichtawild>/django-wildwish .`, I get an error returned: `unable to prepare context: path "mattplichtawild/wildwish-django" not found`.

Hmm, time to do some digging and find out where it's going wrong...