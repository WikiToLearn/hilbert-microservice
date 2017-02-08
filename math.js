var fs = require('fs')
var katex = require('katex')

module.exports = function math(options) {
  // the logging function, built by init
  var log
  
  this.add('role:math,cmd:render', function render(msg, reply) {
    log("Rendering " + msg.tex + '\n')
    var html = katex.renderToString(msg.tex);
    reply(null, {answer: (html)})
  })

 // this is the special initialization pattern
  this.add('init:math', init)


  function init(msg, respond) {
    // log to a custom file
    fs.open(options.logfile, 'a', function (err, fd) {

      // cannot open for writing, so fail
      // this error is fatal to Seneca
      if (err) return respond(err)

      log = make_log(fd)
      respond()
    })
  }
  
  function make_log(fd) {
    return function (entry) {
      fs.write(fd, new Date().toISOString()+' '+entry, null, 'utf8', function (err) {
        if (err) return console.log(err)

        // ensure log entry is flushed
        fs.fsync(fd, function (err) {
          if (err) return console.log(err)
        })
      })
    }
  }

}
