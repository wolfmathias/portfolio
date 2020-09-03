---
template: SinglePost
title: More on Building With Tailwind.
status: Published
date: '2020-09-03'
featuredImage: ''
excerpt: >-
  Using Tailwind's utility classes to quickly build a site.
categories:
  - category: Tech Blog
---

CSS has always been a weakpoint of mine (can you tell from looking at my portfolio?). I know how it works, but it feels like rote memorization, which is not why I fell in love with programming.

In order to build my skills a bit and be able to build the apps I want, I knew I had do something to give my projects better styling. 

## Tailwind Provides Speed

So far, what I'm loving about Tailwind CSS is the ability to skip using a stylesheet altogether. I can focus more on writing components and spitting out the needed JSX without having to worry about a 300 hundred line .css file or conflicting classes.

For example, my first section's JSX looks like this:

```
      <div className="px-32">
      <section id="about" className="text-center py-6">
        <h2 className="inline-block py-3 mb-4 text-3xl font-bold">
        
```

Again, no stylesheet to mess around with!

It's fairly easy to get an idea of how these elements will be styled by looking at their class name. I'm providing some padding (on both the x-axis and the y-axis), margins, font styling, etc. These are all utility classes built into Tailwind. If I want to play with the styling, I simply update or add classes inside of `className`.

This is an amazing way to quickly get a site built. I described it 'brute-forcing' the CSS. The code may start to become repetitive, and the more there is the more likely there will be inconsistency in styling, but I can build without worrying about CSS being an obstacle.

## The Downsides

Of course, this approach has its cons. The snippet above looks straightforward, but the JSX can easily start to become very boilerplate.

Let's look at the following elements to see what I mean:

```
          <div className="w-1/3 flex flex-grow flex-shrink p-6">
            <div className="flex-1 bg-white rounded-t rounded-b shadow-lg p-6">
              <h4 className="font-semibold pb-1 text-lg">First Fact</h4>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>

          <div className="w-1/3 flex flex-grow flex-shrink p-6">
            <div className="flex-1 bg-white rounded-t rounded-b shadow-lg p-6">
              <h4 className="font-semibold pb-1 text-lg">Second Fact</h4>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>

          <div className="w-1/3 flex flex-grow flex-shrink p-6">
            <div className="flex-1 bg-white rounded-t rounded-b shadow-lg p-6">
              <h4 className="font-semibold pb-1 text-lg">Third Fact</h4>
              <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
```

Above are some text cards. You can see that I'm repeating myself a lot already. The solution here would be to abstract the text card element into its own component and render that in the JSX. Something like:

```
<TextCard title="First Fact" body="Lorem ipsum blah blah blah" />
<TextCard title="Second Fact" body="More lorem ipsum" />
<TextCard title="Third Fact" body="It's a little less repetitive" />
```

The component itself would include all the styling so I don't have to keep writing it. 

Even with this aspect, it's still incredibly quick to 'brute force' my way to a well styled website!

This makes me want to rebuild my portfolio now...