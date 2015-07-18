process.stdin.setEncoding("utf8");

var line;

process.stdin.on("readable", function() {
  var chunk = process.stdin.read();
  line += chunk;
})

