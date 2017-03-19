import * as express from "express";
import * as mongodb from "mongodb";
import * as routes from "./routes/index";
import * as db from './db';

var app = express();

app.get('/', routes.index);

app.get('/user/:userid', (req, res) => {
    console.log('getting user ' + req.params.userid);
    db.getUser(req.params.userid, user => {
      res.send(JSON.stringify(user));
    });
});

app.get('/users/', (req, res) => {
    console.log('getting users');
    db.getUsers(user => {
      res.send(JSON.stringify(user));
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});