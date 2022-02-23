const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const { result } = require("lodash");
// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://osama:osama123@nodetuts.6rrgn.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine

app.set("view engine", "ejs");

// listen for requests

// app.listen(3000);

// middleware & static files

// app.use((req, res, next) => {
//   console.log("new req made");
//   console.log("host", req.hostname);
//   console.log("path", req.path);
//   console.log("method", req.method);
//   next();
// });
app.use(express.static("public"));
// this is for accepting forms data (REALLY IMPORTANT)
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// end

// mongoose and mongo sandbox routes

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("621216e09ffe2dbe6a0bf955")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//routes
app.get("/", (req, res) => {
  // const blogs = [
  //   { title: "ansd", snippets: "asdnaodsnoansd" },
  //   { title: "ansd", snippets: "asdnaodsnoansd" },
  //   { title: "ansd", snippets: "asdnaodsnoansd" },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Blog Create" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// redirects

// app.get("/about-me", (req, res) => {
//   res.redirect("/about");
// });
