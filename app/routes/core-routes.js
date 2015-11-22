import React from 'react';
import ReactDomServer from 'react-dom/server';
import ReactApp from '../components/ColorApp';
var App = React.createFactory(ReactApp);

module.exports = function (app) {
  app.get(/\/([0-9a-fA-F]{6})/, function (req, res) {
    console.log('incoming', req.url);
    var color = req.url.slice(1);
    if (color != color.toUpperCase()) {
      res.redirect('/' + color.toUpperCase())
    } else {
      // React.renderToString takes your component
      // and generates the markup
      var reactHtml = ReactDomServer.renderToString(App({colors: ['#' + color]}));
      // Output html rendered by react
      // console.log(myAppHtml);
      res.render('index.ejs', {reactOutput: reactHtml});
    }
  });
};
