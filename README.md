# Build Craft Repair

Website for **Build Craft Repair** — handcrafted goods, furniture, and furniture restoration. Also the home of the Build Craft Repair YouTube channel.

## Live Site

Hosted on GitHub Pages: **https://smartercircuits.github.io/buildcraftrepair/**

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured products, YouTube section, shopping platforms |
| Catalogue | `catalogue.html` | Full product catalogue with search, category filtering & sorting |
| About | `about.html` | Company story, values, YouTube channel info |
| Contact | `contact.html` | Contact form, FAQ, social links |

## Structure

```
buildcraftrepair/
├── index.html        # Home page
├── catalogue.html    # Product catalogue
├── about.html        # About page
├── contact.html      # Contact page
├── css/
│   └── styles.css    # All styles (responsive, accessible)
├── js/
│   ├── main.js       # Shared JS (mobile nav, active links, contact form)
│   └── catalogue.js  # Product data, rendering, filtering & search
├── images/           # Place product and site images here
└── _config.yml       # GitHub Pages configuration
```

## Adding Products

Open `js/catalogue.js` and add an entry to the `PRODUCTS` array:

```js
{
  id: 'my-unique-id',           // kebab-case identifier
  title: 'My Product Name',
  category: 'furniture',        // furniture | decor | restored | workshop
  type: 'handcrafted',          // handcrafted | restored | new
  description: 'Short description of the item.',
  price: 250,                   // number, or 0 for "Contact for pricing"
  emoji: '🪵',                  // shown when no image is available
  image: 'images/my-product.jpg', // optional image path
  etsy: 'https://www.etsy.com/listing/...', // optional Etsy link
  amazon: 'https://www.amazon.com/...',     // optional Amazon link
  available: true               // true | false (false shows "Sold")
}
```

## Adding Real Product Images

Place images in the `images/` folder, then set the `image` field in `PRODUCTS`
(e.g. `image: 'images/walnut-coffee-table.jpg'`). The catalogue will display
the image instead of the emoji placeholder.

## Embedding a YouTube Video

In `index.html` and `about.html`, replace the `yt-embed-placeholder` div with:

```html
<div class="yt-embed">
  <iframe
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    title="Build Craft Repair – latest video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

## GitHub Pages Deployment

1. Push changes to the `main` branch (or whichever branch is configured).
2. In the repository **Settings → Pages**, set the source to the root of `main`.
3. GitHub Pages will serve the site from `index.html` automatically.

No build step is required — the site is pure HTML, CSS, and JavaScript.

## Shopping Platforms

The site links to multiple shopping platforms:

- **Etsy** — `https://www.etsy.com/shop/BuildCraftRepair`
- **Amazon Handmade** — `https://www.amazon.com/handmade`
- **Custom Orders** — via the contact form

Update these URLs in `index.html`, `catalogue.html`, `about.html`, `contact.html`,
and `js/catalogue.js` once the real shop listings are live.
