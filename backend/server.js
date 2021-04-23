const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// sign up a user and insert the user data into the user_information table
app.post("/api/sign-up", async (req, res) => {
  const { username, email, password, createdOn } = req.body; // destructure req body
  const hashedPassword = bcrypt.hashSync(password, 10); // hash password
  try {
    await pool.query(
      "INSERT INTO user_information (username, email, password, created_on) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, createdOn]
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM user_information WHERE email = $1", [email]); // get user
    if (!user.rows[0]) return res.status(404).send("Account does not exist."); // if there is no user, return and send 404 not found
    const hashedPassword = user.rows[0].password; // otherwise, get the users hashed password
    const match = bcrypt.compareSync(password, hashedPassword); // compare the hashed password with the provided password
    if (!match) return res.status(401).send("Incorrect email or password."); // if the passwords do not match, return and send 401 unauthorized
    const userObj = { id: user.rows[0].user_id, email: user.rows[0].email }; // otherwise, create user obj
    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET); // generate jwt access token
    res.cookie("accessToken", accessToken);
    res.send(accessToken);
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
});

// authenticates the access token from the requests authorization headers
const verifyToken = async (req, res, next) => {
  // get auth header value
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.accessToken;
  // check if bearer is undefined
  if (!token) return res.status(401).send("Please sign in to access this feature.");
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

app.get("/api/watch-list", verifyToken, async (req, res) => {
  const id = req.body.id;
  try {
    const result = await pool.query("SELECT * FROM watch_list WHERE user_id = $1 ORDER BY created_on DESC", [id]);
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/add-to-watch-list", async (req, res) => {
  const { uid, movieId, title, releaseDate, image, rating, createdOn } = req.body;
  try {
    await pool.query(
      "INSERT INTO watch_list (user_id, id, original_title, release_date, poster_path, vote_average, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [uid, movieId, title, releaseDate, image, rating, createdOn]
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put("/api/mark-as-watched/:mId/:uId", async (req, res) => {
  const mId = req.params.mId;
  const uId = req.params.uId;
  try {
    await pool.query("UPDATE watch_list SET watched = 't' WHERE id = $1 AND user_id = $2", [mId, uId]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/api/delete-movie/:mId/:uId", async (req, res) => {
  const mId = req.params.mId;
  const uId = req.params.uId;
  try {
    await pool.query("DELETE FROM watch_list WHERE id = $1 AND user_id = $2", [mId, uId]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/api/user", async (req, res) => {
  let currentUser;
  if (req.cookies.accessToken) {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const result = await pool.query("SELECT * FROM user_information WHERE user_id = $1", [decoded.id]);
    currentUser = {
      id: result.rows[0].user_id,
      email: result.rows[0].email,
      accessToken: req.cookies.accessToken,
    };
  } else {
    currentUser = null;
  }
  res.status(200).send(currentUser);
});

app.post("/api/sign-out", async (req, res) => {
  res.clearCookie("accessToken");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
