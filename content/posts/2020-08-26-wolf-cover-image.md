---
template: SinglePost
title: Using Tailwind to adjust the hero image.
status: Published
date: '2020-08-26'
featuredImage: ''
excerpt: >-
  Playing with the hero image with Tailwind.
categories:
  - category: Tech Blog
---

Tailwind provides some awesome CSS utilities. I simply need to edit the className of whatever component I'm working on, no messing around with CSS files unless I need to add my own classes.

For the main image on the index page, I can add "bg-cover" as instructed in the tutorial:

```
<img
    alt="Wolves running through wilderness."
    className="bg-cover bg-center"
    src={wolfPackPicture}
/>
```

Hmm, there is still plenty of padding and the image is not taking up the full width of the screen like I want it to.

Since this is nested inside my <Layout> component, I'll check the CSS there:

```
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        {children}
      </main>
    
    // more components
}
```

Here, all the pages that are wrapped inside <Layout> appear as children in <main>. I can remove the padding and the margin here, and the hero image will follow along with the style changes.

`className="flex-1 w-full mx-auto"` works! I removed 'max-w-4xl', which limits the children to a specific `rem`. I also removed all the padding options. Of course, this means that other sections will also follow along with this, which is not really what I want. I'd have to add the padding and margins to each page individually. Not terrible, but it will be repetitive and might lead to mistakes down the road.

I can add a background image with `<div className="bg-cover bg-center" style={{backgroundImage: `url(${wolfPackPicture})`}}></div>`. While I don't get any errors, the image doesn't show up at all when I use this.

I'll keep playing and see if I can fix this.