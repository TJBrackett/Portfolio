var fs = require('fs');
var http = require('http');
var port = 8888;
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', function(err, data){
    if(err){
      return console.log(err);
    }
  res.end(data);
  });
}).listen(port);
console.log('Server is running on Port: ' + port);
