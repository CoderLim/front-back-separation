export default ({ title, body }) => `
  <!doctype html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="/assets/index.css"/>
    </head>
    <body>
      <div id="root">${body}</div>
      <script src="/assets/bundle.js"></script>
    </body>
  </html>
`;
