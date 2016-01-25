# calendar-web
Front-end of calendar


minimum, barebones client-side-only javascript application. constructed through careful research and inclusion of only the top and most necessary packages.

Lol jk this is has a buttload of packages which is really frustrating.



# Setup

Install node.js with which npm will come prepackaged: https://nodejs.org/en/

Install npm packages.
```
$ npm install
```
Run the app.
```
$ gulp
```

This will run the webpack development server.

Open `http://localhost:8080`.

# Development
Set the environment variable `NODE_ENV` to `development`. This will enable certain developer tools in the app.
```
$ export NODE_ENV=development
```

Make a new branch. Name your branch the name of your new intended feature, prefixed with your initials and a slash.
```
$ git checkout -b js/my-new-feature
```

Make your changes. `commit` frequently. `git add`'s `-p` option is encouraged (interactive add). Commit messages should be in the imperative present tense.
```
$ git add -p
...
$ git add ./stuff/morestuff/my-untracked-file
...
$ git commit -m "Implement my new WORKING sub-feature-1"
...
$ git commit -m "Implement my new WORKING sub-feature-2"
...
$ git commit -m "Implement my new WORKING sub-feature-3"
```

Test. jk, we don't have testing yet.

```
$ gulp test
```

Fix your mistakes. Test again.
```
$ gulp test
```

When finished, push to a NEW branch on github.
```
$ git push -u origin js/my-new-feature
```

Make a pull request, tag someone in a comment or poke someone on slack for review. Merge and delete branch when done.



# Architecture
## Developing and Building 
*npm* manages the packages. The code uses ECMAScript 2015 (ES6) syntax which is compiled with *babel*. The javascript modules are built and combined with *webpack*. *gulp* is the task runner that streamlines command line imperatives. An *eslint* configuration is in place for general code styling and hygeine.



## Application Architecture
The client is written primarily in *React.js*. Some additional utilities and modules:
 - react-modal
 - react-fadethrough (made my me!!)
 - react-router (along with history)
 - react-addons-update

The (pseudo) FLUX Architecture is managed with *Redux*. Additional utilities and modules:
 - react-redux
 - thunk
 - redux-simple-router
 - redux-devtools

A Few other standalone modules utilities and modules:
 - jquery
 - moment
 - lodash
 - immutable (used in isolation with the redux system, soon to be deprecated)


## Styling
"I can throw in some styles rite quick at the end, easy." Never make the mistake of making styling an after-thought. Styling is just as, if not more, time-consuming as core implementation.

*Stylus* is the chosen preprocessor. It's objectively better than Sass or Less. I've injected *nib* mixins for convenience.

*postcss* is the big new thing. It's faster and allows better customization. Utilities and modules:
 - cssnext (includes autoprefixer)
 - rucksack (literally magic)
 - lost (grid system)

An extremely important opinionated pattern I've established is global vs modulated styles. Stylus stylesheets can only be used with *react-css-modules* and will be namespaced (isolated) to the component into which they were imported. Standard CSS stylesheets can be used as usual, with all of its frustrating idiosyncrasies. This is intentional to promote more sane object oriented CSS. However, global utility styles are definitely useful, which is why I've still allowed it.



## Suggested dev tools
Sublime Text 3 is recommended with package control installed. Here are some good packages:
 - babel snippets.
 - stylus snippets
 - eslint



