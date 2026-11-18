# Girka World — Standalone Website Source

Complete standalone source code, styles, animations, and local assets for **Girka World** (all 4 pages, zero Durable / Next.js runtime dependencies).

## Project Structure

```text
├── index.html          # Home page
├── collection.html     # Collection page
├── our-story.html      # Our Story page
├── contact.html        # Contact page
├── css/
│   ├── tokens.css      # Design palette, radii, and fluid @container typography scale
│   ├── base.css        # Base reset, layout shell, utility classes & button system
│   ├── motion.css      # Motion Kit keyframes, split-word mask-up, stagger & parallax rules
│   ├── shared.css      # Shared Header (with mobile menu) & Footer styles
│   ├── home.css        # Home page section styles
│   ├── collection.css  # Collection page section styles
│   ├── our-story.css   # Our Story page section styles
│   └── contact.css     # Contact page section styles
├── js/
│   └── main.js         # Scroll reveals, --x-p progress, parallax, mobile nav & enquiry forms
└── assets/
    ├── images/         # All 27 local photos, ink drawings & brand logo
    └── icons/          # Favicons & Open Graph preview image
```

## Running Locally

Open `index.html` directly in your browser, or run any static server from this folder:

```bash
npx serve .
```

## Connecting Live Enquiry Form Delivery

All three enquiry forms (`index.html`, `collection.html`, `contact.html`) include client-side validation and confirmation states out of the box. To receive submissions via email (for example with Formspree or Web3Forms), add a `data-endpoint` attribute to the `<form>` tag:

```html
<form novalidate data-endpoint="https://formspree.io/f/YOUR_FORM_ID">
```
