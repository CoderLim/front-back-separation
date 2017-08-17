import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/index.jsx';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const appString = renderToString(<App />);
  res.send(template({
    body: appString,
    title: 'first server rendering app'
  }));
});

server.listen(8080);
console.log('You can access the website via http://localhost:8080');
