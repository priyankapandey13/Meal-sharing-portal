const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const path = require("path");


const app = express()
app.use(express.static('src/frontend/'))
app.use(express.json())
app.use('/style.css',express.static(__dirname +'/src/frontend/style.css'));
app.use('/src/frontend/slider/slider_style.css',express.static(__dirname +'/src/frontend/slider/slider_style.css'));


const mealsRouter = require("./src/backend/routes/meals");
app.use("/api/meals", mealsRouter);

// const reservationsRouter = require("./src/backend/routes/reservations");
// app.use("/api/reservations", reservationsRouter);


const featuredmealsRouter = require("./src/backend/routes/featuredmeals");
app.use("/api/featuredmeals", featuredmealsRouter);


// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./src/frontend/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});



//app.listen(process.env.PORT, () => {
//  console.log(`App listens on ${process.env.PORT}`)
//})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listens on ${ PORT }`);
});

