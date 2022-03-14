const sslRedirect = require('heroku-ssl-redirect').default;
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('ping');
});

// enable ssl redirect
app.use(sslRedirect());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); //serving build folder
});
app.listen(port);