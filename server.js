const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // lodash

  const num = _.random(0, 20);
  console.log(num);

  // set header content type
  res.setHeader("content-type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      req.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      req.statusCode = 200;
      break;
    case "/about-me":
      req.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;

    default:
      path += "404.html";
      req.statusCode = 404;

      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
