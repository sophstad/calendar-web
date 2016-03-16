# Contributing
We are open to, and grateful for, any contributions made by the community.  By contributing to Calendar, you agree to abide by the [code of conduct](https://github.com/ADI-Labs/calendar-web/blob/master/CODE_OF_CONDUCT.md).

## General

Please make sure that there aren't existing pull requests attempting to address the issue mentioned. Likewise, please check for issues related to update, as someone else may be working on the issue in a branch or fork.

* Non-trivial changes should be discussed in an issue first
* Develop in a topic branch, not master
* Squash your commits

Before opening an issue, please search the [issue tracker](https://github.com/ADI-Labs/calendar-web/issues) to make sure your issue hasn't already been reported.

## Development

Visit the [issue tracker](https://github.com/reactjs/redux/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```bash
$ git clone https://github.com/<your-username>/redux.git
```

### Building Calendar

Running the `build` task will compile and produce the build.
```bash
$ npm run build
```

The result will be in the `dist` folder.

### Developing Calendar

Running the `watch` task will compile the build and initiate the development server.

```bash
$ npm run watch
```

Open `http://localhost:8080` in your browser.


### Testing and Linting

Please check your code using `npm run lint` before submitting your pull requests. The CI build will fail if linting errors are detected.

To run tests, run the following:
```bash
$ npm run test
```

To perform linting with `eslint`, run the following:
```bash
$ npm run lint
```

### Commit Message Format

Each commit message should include a **type**, a **scope** and a **subject**:

```
 <type>(<scope>): <subject>
```

Lines should not exceed 100 characters. This allows the message to be easier to read on github as well as in various git tools and produces a nice, neat commit log ie:

```
 #459  refactor(utils): create url mapper utility function
 #463  chore(webpack): update to isomorphic tools v2
 #494  fix(babel): correct dependencies and polyfills
 #510  feat(app): add react-bootstrap responsive navbar
``` 

#### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope

The scope could be anything specifying place of the commit change. For example `webpack`,
`helpers`, `api` etc...

#### Subject

The subject contains succinct description of the change:

* Use the imperative, present tense: **"change"** (not "changed", not "changes")
* Capitalize first letter
* Use a period at the end.

### Style
We strive to design software through simplicity and aestheticism. This project uses a light set of linting rules for general hygeine.

## Submitting Changes
* Open a new issue in the [Issue tracker](https://github.com/ADI-Labs/calendar-web/issues).
* Fork the repo.
* Create a new feature branch based off the `master` branch.
* Make sure all tests pass and there are no linting errors.
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

### Pull Requests

Follow the PR template instructions. Read below for more details.

Write [regression] tests for your change. Run the test suite and lint your changes.

```bash
$ npm run test
  . . .
  ✔ a › a.a › <should do x>
  ✔ b › b.a › <should do y>
  ✔ b › b.b › <should do z>
  . . .
  n tests passed
$ npm run lint
```

Pull the latest updates from the `master` branch to ensure your changes do not conflict with or affect any functionality of the application.

```bash
$ git pull origin
```

Run the tests again.

Title your PR precisely. If this fixes an open issue, link to it in the following way: `Fixes #321`. Give a succinct description. Detail the motivation for each listed change. List any new third-party packages with its purpose and provide the package site. Poke someone for review when all criteria have been satisfied.
>@sunyang713 review please

### Examples

---

#### Calendar widget component

**Description**

A simple calendar component using `material-ui`. Allows user navigation and selection of a date. Redux state and flow implemented as well.

**New Packages**
- [Material-ui](http://www.material-ui.com) v2.3.3 A set of react components that implement Google's 'Material Design,' used for the base calendar component.
- [Moment.js](http://momentjs.com) v1.0.1 Parse, validate, manipulate, and display dates in JavaScript, used for easy date handling.

@sunyang713 please review

---

#### Fix possible future error with using nested routes with react router

**Description**

@sunyang713 An issue I ran into. When page is refreshed on a nested route, path cannot be found. See [comment](https://github.com/reactjs/react-router/issues/676#issuecomment-160249067).

Changes the webpack configuration's `output.publicPath` from an empty string to "/".

---

Thank you for your patronage. Have a nice day.
