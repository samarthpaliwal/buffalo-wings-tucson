# Buffalo Wings Tucson

A static four-page website for Buffalo Wings, a wing restaurant at 485 N Grande Ave in Tucson, Arizona. It is plain HTML, CSS and JavaScript with no build step or dependencies beyond Google Fonts. The pages cover the restaurant, its menu with an order builder, location and hours, and Google reviews.

## Requirements

A web browser. The Saira Extra Condensed, IBM Plex Sans and IBM Plex Mono fonts are loaded from Google Fonts, and the location page embeds a Google Map, so an internet connection is needed for those parts.

## Setup

No installation. Clone or download the repository.

## Usage

Open `index.html` in a browser, or serve the folder with any static server (for example `python3 -m http.server` and visit `http://localhost:8000`). All links between pages are relative.

Pages:

- `index.html` (Home): full-screen hero with a rating card and a "Call to order" link, a short description of the restaurant, a stats band with animated count-up numbers (rating, review count, and so on), a "most ordered" favourites grid, a section of cards linking to the menu, location and reviews pages, and a closing call-to-order section with the phone number.
- `menu.html` (Menu): the menu board grouped into wings, chicken fingers, appetizers, sides, combos, drinks and sauces, plus a "Build it" form where you pick a wing count, up to two sauces, a dressing and priced extras. The form produces a running ticket with a total for the extras and a sentence you can read out or copy when phoning in a pickup order. The page also explains the three ways to order (walk in, drive-through, call).
- `location.html` (Location): address with a copy button, hours with today's row highlighted and an "Open now / Closed now / Closed Mondays" badge, an embedded Google Map, buttons for Google Maps, Apple Maps and Waze directions, written directions from I-10 and downtown, and nearby landmarks.
- `reviews.html` (Reviews): the 4.5-star Google rating with a photo collage, a star-distribution bar chart, filter buttons over a set of review cards quoting Google reviewers, and links to read or write reviews on Google.

## How it works

`styles.css` holds the shared theme (dark background, orange accent, CSS variables) and layout for the nav, buttons, cards and lightbox; each page adds its own page-specific CSS in a `<style>` block. `main.js` runs on every page and handles: making the nav solid on scroll and marking the current page; the mobile menu button; fade-in of elements marked `data-reveal` via an IntersectionObserver; a click-to-zoom lightbox for images marked `data-zoom` or inside `.zoomable`; highlighting today's hours row and computing the open/closed badge in Arizona time (UTC-7, no DST) with Sunday 11:00-19:00, Monday closed, other days 10:30-20:00; animated `data-count` counters that respect `prefers-reduced-motion`; and filling in the current year in the footer.

The menu order builder, the address copy button and the review filters are small inline scripts at the bottom of their pages. The order builder caps sauces at two, prices only the extras (wing prices are shown as "ask"), and uses the Clipboard API for the copy button.

## Project layout

```
index.html       home
menu.html        menu and order builder
location.html    address, hours, map, directions
reviews.html     Google rating, chart and review cards
styles.css       shared styles
main.js          shared behaviour (nav, reveal, lightbox, hours, counters)
img/             restaurant photos (photo01-10.jpg)
img/reviews/     photos attached to the quoted reviews
```
