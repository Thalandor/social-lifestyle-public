const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3001;
const app = express();
const db_link = "mongodb://mongo:27017/sociallifestyle";
const routes = require("./routes/")
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

mongoose.connect(db_link, function (err) {
  if (err) {
    console.error("Error occurred while connecting to DB!");
    console.error(err);
  } else console.log("Database connection established successfully");
});



app.listen(port, function () {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
