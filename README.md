
[![Stories in Ready](https://badge.waffle.io/ADI-Labs/calendar-web.png?label=ready&title=Ready)](https://waffle.io/ADI-Labs/calendar-web)
[![Build Status](https://travis-ci.org/ADI-Labs/calendar-web.svg?branch=master)](https://travis-ci.org/ADI-Labs/calendar-web)

# calendar-web
Front-end for calendar



### Setup


Install npm packages and run the `start` script.
```bash
$ npm install
$ npm start
```

This will run the webpack development server. Open `http://localhost:8080`.

### [Contributing - Click me before starting!](blob/master/.github/CONTRIBUTING.md)


# Architecture

### Core Technology
 - ECMAScript 2015 (ES6) syntax
 - React.js

### Utilities and Modules
The client is written primarily in *React.js*. Some additional utilities and modules:
 - react-router

The (pseudo) FLUX Architecture is managed with *Redux*. Additional utilities and modules:
 - react-redux
 - thunk
 - react-router-redux

A few standalone utilities and modules:
 - jquery
 - moment


### Styling
 - *Stylus* is the preprocessor.
 - *Skeleton* is the CSS framework.


## Suggested dev tools
Sublime Text 3 is recommended with package control installed. Here are some good packages:
 - babel snippets
 - stylus snippets
 - eslint
