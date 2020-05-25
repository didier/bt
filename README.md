# Miit — Modern Dating

A dating app assignment for @cmda-bt Blok Tech

## Installing

```bash
$ git clone https://github.com/didiercatz/bt.git
```

```bash
$ npm install # or yarn
```

## Running the server

```bash
$ npm run start # or yarn start
```

## Running the front-end

```bash
$ npm run dev # or yarn dev
```

## Components

This projects uses componentization in the form of Atomic Design. Components are separated in three categories: atoms, molecules and organisms. For reference, see [Brad Frost's excellent article on Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

In short:

- **Atoms** are small single elements or units — buttons, input fields, etc.
- **Molecules** are related elements like an input field and a button together.
- **Organisms** are made up of molecules and atoms, like a form containing multiple input fields and buttons.

In this project, components are stores in `views/partials/components`

```bash
views/
├── partials/
│ ├── components/
│ │ ├── atoms/
│ │ │ ├── _nav.scss
│ │ │ ├── nav.hbs
│ │ ├── molecules/
│ │ ├── organisms/
```

When running the front-end with `npm run dev`, a script called `get-components.js` is ran aswell. This automatically adds all component `.scss` (for example: `_nav.scss`) files to a single `_components.scss` file which is imported into the main bundle. See [`scripts/get-components.js`](https://github.com/didiercatz/bt/blob/master/scripts/get-components.js) and [`src/styles/base/_components.scss`](https://github.com/didiercatz/bt/blob/master/src/styles/base/_components.scss).

## Conventions

This projects uses `eslint` and `stylelint`. Be sure to install those in your editor, or run their respective scripts.

Boolean variables are to be prepended with either `is` or `has`, e.g.:

```js
const isLoggedIn = true
const hasUserLoggedIn = true
```
