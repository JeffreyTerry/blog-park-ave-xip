// Express module.
var express = require('express');

// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
        realm: "Simon Area."
    }, function (username, password, callback) { // Custom authentication method.
        console.log(username, password);
        callback(username === "Tina" && password === "Bullock");
    }
)

// Application setup.
var app = express();
app.use(auth.connect(basic));

// Setup route.
app.get('/', function(req, res){
  res.send("Hello from express - " + req.user + "!");
});

app.get('/books', function(req, res){
  res.send('yolo');
});

// Start server.
app.listen(1337);

// Log URL.
console.log("Server running at http://127.0.0.1:1337/");