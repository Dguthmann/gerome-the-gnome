// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Character Data
// var characters = [
//     {
//     character: 
    

// }

// ]; 

// Routes
// app.get("/", function(req, res) {
//     res.render("index",);
//   });
  
//   app.get("/", function(req, res) {
//     res.render("index",);
//   });
  
//   app.get("/", function(req, res) {
//     res.render("index", {
      
//     });
//   });
  
  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  