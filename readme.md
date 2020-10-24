# Campfire

> Visual website builder for people who build sites for others

## About

Campfire is a React based application to visually build websites. It uses tailwindcss as the styling framework for the UI as well as output.

### Development

This project uses parcel to bundle the javascript. To get started, clone this repo, `npm install`, and then `npm run dev`. For production builds, run `npm run build`

### How does it work

The visual preview is made up of react components, that are rendered from state maintained in redux. The site is described as an object. When a user wants to edit a certain 'block' or 'piece' of the website, a popup will appear and allow the user to make edits to a clone of the particular piece in the site object tree. When changes are made, it is injected back into the main site object and the preview is updated.
