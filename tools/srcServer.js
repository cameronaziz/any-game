import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
//import csurf from 'csurf';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(express.static('./public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
//app.use(csurf({cookie: true}));

app.get(['/referee/*', '/referee'], function(req, res) {
  res.sendFile(path.join( __dirname, '../src/referee.html'));
});

app.get(['/sandbox/*', '/sandbox'], function(req, res) {
  res.sendFile(path.join( __dirname, '../src/sandbox.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}/referee`, 'google chrome');
    open(`http://localhost:${port}`, 'google chrome');
  }
});
