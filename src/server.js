/**
 *
 *  How to implement router in  server rendering: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
 *
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/index.jsx';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  let context = {};
  const appString = renderToString(
     <StaticRouter context={context} location={req.url}>
       <App />
     </StaticRouter>);

  res.send(template({
    body: appString,
    title: 'first server rendering app'
  }));
});

server.listen(8080);
console.log('You can access the website via http://localhost:8080');
