import * as express from "express";
import * as routes from "./routes/index";
var app = express();

app.get('/', routes.index);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});