const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;

const users = require("./users.json");
const app = express();

const services = xsenv.getServices({ uaa: "nodeuaa" });

passport.use(new JWTStrategy(services.uaa));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));

// https://github.com/gregorwolf/bookshop-demo/blob/main/srv/server.js
// jwt token decode https://token.dev/
const readJwt = function (req) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const theJwtToken = authHeader.substring(7);
    if (theJwtToken) {
      console.log("===> JWT Token: " + theJwtToken);
      const jwtBase64Encoded = theJwtToken.split(".")[1];
      if (jwtBase64Encoded) {
        const jwtDecoded = Buffer.from(jwtBase64Encoded, "base64").toString(
          "ascii"
        );
        return JSON.parse(jwtDecoded);
      }
    }
  }
};

app.get("/users", function (req, res) {
  res.send(
    `[${new Date().toLocaleString()}] User: ${JSON.stringify(
      users
    )} Application user: ${JSON.stringify(
      req.user
    )} Decode token ${JSON.stringify(readJwt(req))} Headers ${JSON.stringify(
      req.headers
    )}`
  );
  var isAuthorized = req.authInfo.checkScope("$XSAPPNAME.Display");
  if (isAuthorized) {
    // res.status(200).json(users);
    // res.send('Application user: ' + req.user.id);
  } else {
    res.status(403).send("Forbidden");
  }
});

app.post("/users", function (req, res) {
  const isAuthorized = req.authInfo.checkScope("$XSAPPNAME.Update");
  if (!isAuthorized) {
    res.status(403).json("Forbidden");
    return;
  }

  var newUser = req.body;
  newUser.id = users.length;
  users.push(newUser);

  res.status(201).json(newUser);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("nodeapp listening on port " + port);
});
