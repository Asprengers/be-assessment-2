// console.log ('hello')
// var fs = require('fs')
// fs.createReadStream('readme.md')
//   .pipe(process.stdout)
//   var http = require('http')
//
// var url = 'http://example.com'
//
// http.get(url, onrequest)
//
// function onrequest(res) {
//   res.pipe(process.stdout)
// }
var http = require('http')

http.createServer(onrequest).listen(8000)

function onrequest(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello World!</h1>\n')
}
