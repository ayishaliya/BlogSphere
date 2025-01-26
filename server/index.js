const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Blog = require("./models/Blog");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const secret = "wfdghjkcmdnbvwugsyuhxjik";

mongoose
  .connect(
    "mongodb+srv://22b449:WDmUOSYTu4r9fbEm@cluster0.enmzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => console.log("Database connected"))
  .catch((err) => console.log(err));

app.post("/sign-up", async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const userDoc = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign(
      { username, id: userDoc._id },
      secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/create", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  try {
    const newBlog = await Blog.create({ title, content, author });
    res.json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

app.listen(3000, () => {
  console.log("Server Connection Successfull");
});
