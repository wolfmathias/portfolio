---
template: SinglePost
title: Making a static site from 'scratch'
status: Published
date: '2020-08-23'
featuredImage: ''
excerpt: >-
  My second gatsby website.
categories:
  - category: Tech Blog
---

# More in depth with React and Gatsby

After using a Gatsby template to build my portfolio, I chose a separate static site to dive deeper.

I already knew I had the Gatsby CLI installed when I built the portfolio. 

I wanted a basic page to be able to understand how all the components are really working and I wanted it to include a CSS framework out of the box. CSS is a personal weakness, I wanted to learn a tool to really understand how to harness it. I decided on Tailwind.

Running the command `gatsby new reintroduce-wolves https://github.com/taylorbryant/gatsby-starter-tailwind` starts the process to create a new directory with some basic subdirectories and files.

`index.html` is where I'll start:

```
/src
    /components
    /css
    /images
    /pages
        /404.js
        /about.js
        /contact.js
        /index.js
```

The code looks like the following:

```
function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center">
        <img
          alt="Cat and human sitting on a couch"
          className="block w-1/2 mx-auto mb-8"
          src={catAndHumanIllustration}
        />

        <h2 className="inline-block p-3 mb-4 text-2xl font-bold bg-yellow-400">
          Hey there! Welcome to your first Gatsby site.
        </h2>

        <p className="leading-loose">
          This is a barebones starter for Gatsby styled using{` `}
          <a
            className="font-bold text-gray-900 no-underline"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
          , a utility-first CSS framework.
        </p>
      </section>
    </Layout>
  );
}

export default IndexPage;
```

SEO is one of the key features for a static site versus an SPA. For this project, I'll start with the keywords I used when researching.

```
    <SEO
        keywords={[`wolf`, `reintroduction`, `Colorado`, `prop`, `114`]}
        title="Home"
    />
```

The next step is to change the hero image. For the starter, there is a basic graphic of a person sitting on the couch with a cat (how perfect!). Here I'll add full width image of a wolf. Let's change the alt-text and the source, then update the class. The default picture is an SVG file. Because of the type of hero image I want, I'll actually be using a PNG.

```
import wolfPackPicture from "../images/wolf1-4x3.png";

<img
    alt="Wolves running through wilderness."
    className="block w-1/2 mx-auto mb-8"
    src={wolfPackPicture}
/>  
```

Almost there for first iteration of the hero image. Looks like it's time to dig deeper into Tailwind and play with it.