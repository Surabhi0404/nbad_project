const express = require("express");
const mysql = require("mysql");
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mission!1234",
  database: "budget",
});

app.get("/budget", async (req, res) => {
  pool.getConnection(function(err, connection) {
  connection.query("SELECT * FROM budget_list", function (error, results, fields) {
    connection.release();
    if (error) throw error;
    res.json(results);
  });
});
});

app.post("/api/add", async(req, res) => {
  connection.connect();
  var sql = "INSERT INTO customers (name, address) VALUES ?";
  var values = req.body;
  connection.query(sql, [values], function (error, results, fields) {
    connection.end();
    if (error) throw error;
    res.json(results);
  });
});

app.put("/api/edit", async(req, res) =>{
  connection.connect();
  var sql = "UPDATE emp SET FROM customers WHERE id ="+req.params.id;
  connection.query(sql, function (error, results, fields) {
    connection.end();
    if (error) throw error;
    res.json(results);
  });
});

app.delete("/api/delete/:id", async(req, res) => {
  connection.connect();
  var sql = "DELETE FROM customers WHERE id ="+req.params.id;
  connection.query(sql, function (error, results, fields) {
    connection.end();
    if (error) throw error;
    res.json(results);
  });
});

app.post("/api/signup", async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //password encryption using bcrypt
    const date = new Date().toISOString().slice(0, 19).replace("T", " "); //mysql Date format
    pool.getConnection(function(err, connection) {
      connection.connect();
    connection.query(
      'INSERT INTO user_list (username, email, password, user_created) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, date],
      function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.status(200).send(`User: ${username} Signed Up successfully!`);
      }
    );
  });

  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
