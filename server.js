const express = require("express");
const app = express();
const morgan = require("morgan");

const path = require("path");

const port = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// Middleware
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value as req.body

// serves the built version of your react app
app.use(express.static(path.join(__dirname, "client/build")));
// App
app.get("/api/status", (req, res) => {
  res.json({ status: "Running" });
});

app.post("/api/hello", (req, res) => {
  console.log(req.body);
  res.json({ status: "Got Post" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});