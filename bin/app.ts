import * as express from "express";
import * as mongodb from "mongodb";
import * as routes from "./routes/index";
import * as db from './db';

import { Item } from './shared/Item';
import { Login } from './shared/Login';
import { User } from './shared/User';

var app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', routes.index);

app.get('/user/:userid/:userPassword', (req, res) => {
  console.log('getting user ' + req.params.userid);
  db.getUser(req.params.userid, user => {
    let login: Login = {status : false };

    if (!!user && user.login === req.params.userid &&
      user.password === req.params.userPassword){
        login.status=true;
        res.send(JSON.stringify(login));
      }
      else{
        login.status=false;
          res.send(JSON.stringify(login));
      }

  });
});

app.get('/users/', (req, res) => {
  console.log('getting users');
  db.getUsers(user => {
    res.send(JSON.stringify(user));
  });
});

app.get('/items/', (req, res) => {
  db.getProducts(produts => {
    res.send(JSON.stringify(produts));
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});