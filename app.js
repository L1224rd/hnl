const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let noSleepTime = 5;

const urls = ["https://nosleep2.herokuapp.com/"];

const noSleep = () => {
  noSleepTime += 5;

  urls.forEach(url => {
    request(url, { json: true }, (err, res, body) => {
      if (res) console.log(res.body);
    });
  });
};

app.get("/", (req, res) => {
  res.send(`Not sleeping for ${noSleepTime} seconds...`);
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/urls", (req, res) => {
  res.send(JSON.stringify(urls));
});

app.post("/add", (req, res) => {
  urls.push(req.body.url);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('READY');
  setInterval(noSleep, 5000);
});
