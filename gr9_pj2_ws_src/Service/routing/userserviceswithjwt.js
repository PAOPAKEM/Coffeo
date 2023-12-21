express = require("express");
mysql = require("mysql2");
router = express.Router();

cors = require("cors");
jwt = require("jsonwebtoken");
authorize = require("../middlewares/auth");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let whiteList = ["http://203.159.93.114:8037", "http://203.159.93.114:8038"];

let corsOptions = {
  origin: whiteList,
  methods: "GET,POST,PUT,DELETE",
};

router.use(cors(corsOptions));

dotenv = require("dotenv");
dotenv.config();

// create the connection to database
let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// default route
router.get("/", function (req, res) {
  return res.send({ error: true, message: "admin services" });
});

// Login
router.post("/login", (req, res) => {
  let userData = req.body;
  console.log(userData);

  const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes

  if (!userData) {
    return res.send({ error: true, message: "Please enter Username or Password." });
  }

  connection.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [userData.username, userData.password],
    function (error, results) {
      if (error)
        return res.send({
          error: true,
          message: "Admin not found.",
        });
      else {
        if (results.length === 0) {
          res.status(401).json({
            error: true,
            message: "Invalid ID or Password",
          });
        } else {
          const userLogin = results[0];
          let jwtToken = jwt.sign(
            {
              ID: userLogin.username,
              password: userLogin.password,
            },
            process.env.SECRET,
            {
              expiresIn: expirationTime,
            }
          );
          res.status(200).json({
            token: jwtToken,
            message: `User: ${userLogin.username} Expired in ${expirationTime}`
          });
        }
      }
    }
  );
});
// --------------
router.post("/log-in", (req, res) => {
  let userData = req.body;
  console.log("userdata: "+userData.username);

  if (!userData) {
    return res.send({ error: true, message: "Please enter ID or Password." });
  }

  connection.query(
    "SELECT * FROM admin WHERE ID = ? AND password = ?",
    [userData.username, userData.password],
    function (error, results) {
      if (error)
        return res.send({
          error: true,
          message: "Admin not found.",
        });
      else {
        if (results.length === 0) {
          res.status(401).json({
            error: true,
            message: "Invalid ID or Password",
          });
        } else {
          const userLogin = results[0];
          res.status(200).json({
            message: `User: ${userLogin.username} successfully logged in.`,
          });
        }
      }
    }
  );
});


// Testing Login
// method: post
// URL: http://203.159.93.114:8038/userserviceswithjwt/login
// body: raw JSON
// {
//   "username": "admin1",
//   "password": "0000"
// }

// Retrieve all user infomation from table users
router.get("/users", authorize, function (req, res) {
  connection.query("SELECT * FROM admin", function (error, results) {
    if (error)
      return res.send({
        error: true,
        message: "List of users is not found.",
      });
    return res.send({ error: false, data: results, message: "Users list." });
  });
});

// Retrieve user from table users with ID
router.get("/user/:id", authorize, function (req, res) {
  let user_id = req.params.id;

  if (!user_id) {
    return res.send({ error: true, message: "Please provide user id." });
  }

  connection.query(
    "SELECT * FROM admin where ID=?",
    user_id,
    function (error, results) {
      if (error || results.length === 0)
        return res.send({
          error: true,
          message: "User is not found.",
        });
      return res.send({
        error: false,
        data: results[0],
        message: "User retrieved",
      });
    }
  );
});

// Add user into table user
router.post("/user", authorize, function (req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res.send({
      error: true,
      message: "Please provide user information",
    });
  }

  connection.query("INSERT INTO admin SET ? ", user, function (error, results) {
    if (error)
      return res.send({
        error: true,
        message: "The user cannot be inserted.",
      });
    return res.send({
      error: false,
      data: results.affectedRows,
      message: "New user has been created successfully.",
    });
  });
});

// Testing Insert a new user
// method: post
// URL: http://203.159.93.114:8038/userserviceswithjwt/user
// body: raw JSON
// {
//     "ID": 99,
//     "usernanme": "admin44",
//     "fname": "Apple",
//     "lname": "Pie",
//     "password": "admin44"
// }


//  Update table users with ID
router.put("/user", authorize, function (req, res) {
  let user_id = req.body.ID;
  let user = req.body;

  if (!user_id || !user) {
    return res.send({
      error: true,
      message: "The user information is required.",
    });
  }

  connection.query(
    "UPDATE admin SET ? WHERE ID = ?",
    [user, user_id],
    function (error, results) {
      if (error)
        return res.send({
          error: user,
          message: "The user cannot be updated.",
        });
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "User has been updated successfully.",
      });
    }
  );
});

// Testing Update user
// method: put
// URL: http://203.159.93.114:8038/userserviceswithjwt/user
// body: raw JSON
// {
//     "ID": 99,
//     "usernane": "admin44"
//     "fname": "Pie",
//     "lname": "Apple",
//     "password": "admin44"
// }


//  Delete user from table users with ID
router.delete("/user", authorize, function (req, res) {
  let user_id = req.body.ID;

  console.log(user_id);

  if (!user_id) {
    return res.send({ error: true, message: "Please provide user id" });
  }
  connection.query(
    "DELETE FROM admin WHERE ID = ?",
    [user_id],
    function (error, results) {
      if (error)
        return res.send({
          error: true,
          message: "The user cannot be deleted.",
        });
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "User has been deleted successfully.",
      });
    }
  );
});

// Testing Delete user
// method: delete
// URL: http://203.159.93.114:8038/userserviceswithjwt/user
// body: raw JSON
// {
//     "ID": 99
// }

module.exports = router;