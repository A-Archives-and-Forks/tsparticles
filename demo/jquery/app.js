const express = require('express');
const helmet = require('helmet');
const stylus = require('stylus');
const rateLimit = require("express-rate-limit");

const path = require('path');
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//app.use(limiter);
//app.use(helmet());

const port = 3002;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(stylus.middleware('./public'));
app.use(express.static('./public'));
app.use("/lodash", express.static("./node_modules/lodash"));
app.use("/fontawesome", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/jsoneditor", express.static("./node_modules/jsoneditor/dist"));
app.use("/tsparticles", express.static("./node_modules/tsparticles"));
app.use("/demo-configs", express.static("./node_modules/@tsparticles/configs"));
// Serve the local wrapper build so the demo uses the current jQuery wrapper
// implementation in this repo (wrappers/jquery/dist). Use an absolute
// resolved path so the mapping works regardless of the cwd used to start
// the demo server.
app.use(
    "/jquery-particles",
    express.static(path.resolve(__dirname, '..', '..', 'wrappers', 'jquery', 'dist'))
);
app.use("/preset-links", express.static("./node_modules/@tsparticles/preset-links"));
app.use("/stats.ts", express.static("./node_modules/stats.ts/"));
app.use("/jquery", express.static("./node_modules/jquery/dist/"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
