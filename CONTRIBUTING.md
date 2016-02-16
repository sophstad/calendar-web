# Contributing
We are open to, and grateful for, any contributions made by the community.  By contributing to Calendar, you agree to abide by the [code of conduct](https://github.com/ADI-Labs/calendar-web/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions
Before opening an issue, please search the [issue tracker](https://github.com/ADI-Labs/calendar-web/issues) to make sure your issue hasn't already been reported.

If you are a member of *Aesthetic*, create a card here on the [waffle board](https://waffle.io/ADI-Labs/calendar-web)

## Development

Visit the [issue tracker](https://github.com/ADI-Labs/calendar-web/issues) to find a list of open issues that need attention.

Fork, then clone the repo:
```bash
git clone https://github.com/your-username/calendar-web.git
```

### Aesthetic Members

If you are part of the *Aesthetic* team, the following instructions give you a streamlined development process.

*Make a new branch*. Name your branch the name of your new intended feature, prefixed with your initials and a slash.
```bash
$ git checkout -b js/my-new-feature
```

Make your changes. `commit` frequently. `git add`'s `-patch` option is encouraged (interactive add). Commit messages should be in the imperative present tense.
```bash
$ git add --patch
...
$ git add ./stuff/morestuff/my-untracked-file
...
$ git commit -m "Implement my new WORKING sub-feature-1"
...
$ git commit -m "Implement my new WORKING sub-feature-2"
```


When finished, push to a NEW branch on github.
```bash
$ git push --set-upstream origin js/my-new-feature
```

Make a pull request, tag someone in a comment or poke someone on slack for review. Merge and delete branch when done.

>Don't forget to switch back to the master branch on your local machine and delete the old feature-branch when you're finished:
```bash
$ git checkout master
$ git branch --delete js/my-new-feature
```




### Building

#### Build Calendar

Running the `build` task will create both a CommonJS module-per-module build and a UMD build.
```bash
npm run build
```

To build for production, run `prod:build`.
```bash
npm run build:prod
```


### Testing and Linting
To run both linting and testing at once, run the following:
```bash
npm run tests
```

To only run tests:
```bash
npm run test
```

To continuously watch and run tests, run the following:
```bash
npm run test:watch
```

To perform linting with `eslint`, run the following:
```bash
npm run lint
```


###Style
The [reactjs](https://github.com/reactjs) GitHub org is trying to keep a standard style across its various projects, which can be found over in [eslint-config-reactjs](https://github.com/reactjs/eslint-config-reactjs). If you have a style change proposal, it should first be proposed there. If accepted, we will be happy to accept a PR to implement it here.

## Submitting Changes
* Open a new issue in the [Issue tracker](https://github.com/ADI-Labs/calendar-web/issues).
* Fork the repo.
* Create a new feature branch based off the `master` branch.
* Make sure all tests pass and there are no linting errors.
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
