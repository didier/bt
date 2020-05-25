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
$ npm run start
```

## Running the front-end

```bash
$ npm run dev
```

## Components

This projects uses componentization in the form of Atomic Design. Components are separated in three categories: atoms, molecules and organisms. For reference, see [Brad Frost's excellent article on Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

In this project, components are stores in `views/partials/components`

views/
├── partials/
│ ├── components/
| │ ├── atoms/
| │ ├── molecules/
| │ ├── organisms/

## Conventions

This projects uses `eslint` and `stylelint`. Be sure to install those in your editor, or run their respective scripts.

Boolean variables are to be prepended with either `is` or `has`, e.g.:

```js
const isLoggedIn = true
const hasUserLoggedIn = true
```
