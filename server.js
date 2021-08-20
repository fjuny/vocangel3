require('dotenv').config();
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");


dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;
const mode = process.env.NODE_ENV;

const app = express();
//log request
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to the body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set up view engine
app.set("view engine", "ejs");

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/notes", (req, res) => {
    res.render("notes");
  });
  app.get("/game", (req, res) => {
    res.render("game");
  });
//load routers
const services = require('./server/services/render');

const controller = require('./server/controller/controller')


//api
app.post('/api/users', controller.create);
app.get('/api/users', controller.find);
app.put('/api/users/:id', controller.update);
app.delete('/api/users/:id', controller.delete);

app.get('/',services.homeRoutes);

/**
* @description Root Route
* @method GET /
*/

/**
* @description add users
* @method GET /add-user
*/

app.get('/add-user',services.add_user);

/**
* @description update users
* @method GET /update-user
*/

app.get('/update-user',services.update_user);



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


