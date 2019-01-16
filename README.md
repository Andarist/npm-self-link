# npm-self-link

> CLI tool to bootstrap a node package, allowing it to depend on itself.

[_Bootstrapping_][wiki] is the concept of building something using the thing
itself as a part of the process. npm packages can't literally add dependencies
on themselves, but `npm-self-link` makes use of [`npm link`][link] to allow
them to do so.

## installation

```shell
# using yarn
yarn add --dev npm-self-link

# using npm
npm install --save-dev npm-self-link
```

## usage

Simply run the command in your terminal:

```shell
npm-self-link
```

> Note: you must run the command again after each `npm install`, which does
not preserve package links.

or add it to an npm script in your `package.json`:

```json
{
  "scripts": {
    "pretest": "npm-self-link",
    "test": "node tests.js"
  }
}
```

Generally you should run `npm-self-link` prior to any process where your package
will `import` (or `require`) itself.

## see also

* [param.macro][macro] &ndash; a babel [macro][plugin] that uses `npm-self-link`

[wiki]: https://en.wikipedia.org/wiki/Bootstrapping_(compilers)
[link]: https://docs.npmjs.com/cli/link.html
[macro]: https://github.com/citycide/param.macro
[plugin]: https://github.com/kentcdodds/babel-plugin-macros
