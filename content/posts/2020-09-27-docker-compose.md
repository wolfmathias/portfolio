---
template: SinglePost
title: Docker Compose
status: Published
date: '2020-09-27'
featuredImage: ''
excerpt: >-
  Using Docker Compose
categories:
  - category: Tech Blog
---

I've been spending a lot of time going through tutorial after tutorial, learning how to get an app into a container and onto docker hub, then deploying that to a service like AWS Fargate. The problem is that a single tutorial wasn't teaching me what I needed to know. I had tabs and tabs open, each one tackling setting up a container a slightly different way with slightly different requirements. I had to piece the bits of knowledge together to really understand what I was doing.

I had previous been using the docs on Docker Hub to go through the steps of setting up a "Hello World" app. But what if I'm trying to get an app that will use an HTTP server like NGINX and connects to Postgresql for the database? These are all things that will need to be included in the docker container. `docker build` wasn't the tool I was looking for.

## Docker Compose

From Docker Hub: Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services.

Think of Compose as running multiple `docker build` commands. The `docker-compose` command will use our yml file to build multiple containers to compose the image.

There is still a Dockerfile, the additional 'docker-compose.yml' includes the configurations to build the smaller images needed for the app. 

```
version: "3.8"
   
services:
  db:
    image: postgres:12
    environment:
        # These need to be changed to match db
      - POSTGRES_DB=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
  web:
    build: .
    command: ["./wait-for-postgres.sh", "db", "python", "manage.py", "migrate", "runserver 0.0.0.0:8000"]
    volumes:
      - .:/django-wildwish
    ports:
      - "8000:8000"
    depends_on:
      - db
```

The image that I'm pulling in my 'compose' file is Postgres version 12, I also include some environment variables (the ones shown are default).

The `web` configurations are what we'll be doing when running `docker-compose web`. It will build the current directory ('.'), then run the other commands specified.

I'm glad I went through all those tutorials on using `docker build` to discover it wasn't the approach that would work for me. Knowing that is just as helpful to understand more of what I am doing.
