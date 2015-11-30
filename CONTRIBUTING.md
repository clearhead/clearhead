# Contributing

### Pull Requests

Please work on a new branch and submit your changes as pull requests. To do this you can use the following commands:

```shell
git branch module-name
git checkout module-name
#Make your changes
git add .
git commit -m "Commit message"
git push -u origin module-name
```

After you've pushed your changes you can go to github and change to your new branch and there should be a button to create a pull request. Please ping @beaulm or @casecode in your merge message.

*Before* submitting a pull request, please make sure the following is done…

1. You're working from a branch, not `master`.
2. If your code can be tested, there's tests for it.
3. You've updated necessary documentation.
4. All tests and linting has passed (`gulp`).

Once you've done all that, an admin of the project will run `npm run bump` to auto build / test / bump / push.

### Code Conventions

Please try to follow the conventions that are currently in place.

### Testing

There is currently test coverage using Mocha, Chai, Sinon, and PhantomJS.
Testing any new modules is highly encouraged. See the `test` directory for
examples of how to test your modules. If you need to use PhantomJS in order
to test in a browser environment, see `test/optimizely-jquery-polyfill.html` and
`test/fixtures/src/optimizely-jquery-polyfill.js` for an example of how to do so.
Run `gulp` to make sure your code lints and your tests pass.

## License

By contributing you agree that your contributions will be licensed under the same [LICENSE](LICENSE.md) as this project.
