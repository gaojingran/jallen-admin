

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/jallen', {
    "target": "http://localhost:3000",
    "pathRewrite": { "^/jallen": "" }
  }));
};
