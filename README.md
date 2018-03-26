# plist-loader

Loads `.plist` property list files using the `plist` package.

plist files often contain environment variables like `${ENV_VAR}`, which can be supplied with [`envvar-loader`](https://npmjs.com/package/envvar-loader) before `plist-loader`.

```js
// webpack.config.js

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.plist$/,
        loader: 'plist-loader',
      },
      {
        test: /\.plist$/,
        loader: 'envvar-loader',
      },
    ]
  }
  ...
}
```
