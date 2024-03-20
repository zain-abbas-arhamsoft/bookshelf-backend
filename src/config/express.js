const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const bearerToken = require("express-bearer-token");
const auth = require("../api/middlewares/auth");
const routes = require("../api/routes/v1/index");
const error = require("../api/utils/error");
const passport = require("passport");
const { port } = require("../config/var");
const session = require("express-session"); // Import express-session
const { secretKey } = require("./var");

/**
 * express instance
 */
const app = express();
const http = require("http").createServer(app);
const apiRequestLimiterAll = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 90000,
});
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json({ limit: "5000mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000,
  }),
);

// // Use express-session for session management
app.use(
  session({
    secret: secretKey, // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(bearerToken());
app.use("/v1/", apiRequestLimiterAll);
app.use(cors(corsOptions));
app.use(compression());
app.use(auth.authenticate);
app.use("/v1/", routes);

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

http.listen(port);

module.exports = app;
