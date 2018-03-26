import path from 'path';
import webpack from 'webpack';
import test from 'ava';
import { config } from 'dotenv';

const expected = {
  "CFBundleDevelopmentRegion": "English",
  "CFBundleExecutable": "plist_executable.js",
  "CFBundleIconFile": "",
  "CFBundleIdentifier": "io.mtso.plist_loader",
  "CFBundleInfoDictionaryVersion": "6.0",
  "CFBundleName": "plist_loader",
  "CFBundlePackageType": "APPL",
  "CFBundleSignature": "some-sig",
  "CFBundleVersion": "1.0",
  "NSMainNibFile": "MainMenu",
  "NSPrincipalClass": "NSApplication",
  "CFBundleDisplayName": "Plist Loader",
};

const options = {
  mode: 'development',
  entry: path.resolve(__dirname, './fixtures/Info.plist'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, './output'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.plist$/,
        loader: require.resolve('../index.js'),
      },
      {
        test: /\.plist$/,
        loader: 'envvar-loader',
      },
    ],
  },
};

test.cb((t) => {
  config({
    path: path.resolve(__dirname, './fixtures/.test.env'),
  });

  webpack(options, function onCompilationFinished(err, stats) {
    if (err) {
      return t.end(err);
    }

    if (stats.hasErrors()) {
      return t.end(stats.compilation.errors[0]);
    }

    if (stats.hasWarnings()) {
      return t.end(stats.compilation.warnings[0]);
    }

    const bundle = require('./output/bundle');
    t.deepEqual(bundle, expected);

    t.end();
  });
})
