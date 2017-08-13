'use strict';

const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const proxyMiddleware = require('http-proxy-middleware');
const bundler = webpack(webpackConfig);
const bs = browserSync.create();

bs.init({
  logPrefix: 'AMT',
  browser: "chrome",
  server: {
    baseDir: [
      'dist',
    ],
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true}
      }),
      // bundler should be the same as above
      webpackHotMiddleware(bundler),
      proxyMiddleware( {
        target: "/", // target host
        changeOrigin: true,               // needed for virtual hosted sites
        pathRewrite: {'^../' : ''},
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          '/' : 'http://localhost:8080/interview'
        }
      })
    ]
  },
});

