// Launch microservice

require('seneca')()
  .use(require('./math.js'), {logfile:'./math.log'})
  .listen()

// var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
