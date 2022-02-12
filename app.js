const express = require("express");
const morgan = require("morgan");
// express app
const app = express();

// register view engine

app.set("view engine", "ejs");

// listen for requests

app.listen(3000);

// middleware & static files

// app.use((req, res, next) => {
//   console.log("new req made");
//   console.log("host", req.hostname);
//   console.log("path", req.path);
//   console.log("method", req.method);
//   next();
// });
app.use(express.static("public"));
app.use(morgan("dev"));
// end

app.get("/", (req, res) => {
  const blogs = [
    { title: "ansd", snippets: "asdnaodsnoansd" },
    { title: "ansd", snippets: "asdnaodsnoansd" },
    { title: "ansd", snippets: "asdnaodsnoansd" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Blog Create" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// redirects

// app.get("/about-me", (req, res) => {
//   res.redirect("/about");
// });
