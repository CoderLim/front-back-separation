/**
 *
 *  How to implement router in  server rendering:
 *  https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
 *
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import httpProxy from 'http-proxy-middleware';
import App from './app/index.jsx';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));
server.use('/api', httpProxy({target: 'http://10.185.30.237:8095', changeOrigin: true, pathRewrite: {
  '^/api': ''
}}));

server.get('/', (req, res) => {
  let context = {};
  const html = renderToString(
     <StaticRouter context={context} location={req.url}>
       <App />
     </StaticRouter>);

  res.send(template({
    // Fixed: Markup different on the server and the client
    // https://github.com/Hashnode/mern-starter/issues/149
    body: process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`,
    title: 'first server rendering app'
  }));
});

server.listen(8080);
console.log('You can access the website via http://localhost:8080');
