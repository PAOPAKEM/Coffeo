express = require("express");
mysql = require("mysql2");
router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Store uploaded file in memory
const upload = multer({ storage });

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

// Login to get token to access router
// method: POST
// URL: http://203.159.93.114:8038/userserviceswithjwt/login
// body: raw JSON
// {
//   "username": "admin1",
//   "password": "0000"
// }


// default route
router.get("/", function (req, res) {
  return res.send({ error: true, message: "product services" });
});

// Retrieve product from table products with criteria
router.get("/products", function (req, res) {
  let product_name = req.query.product_name;
  let roast = req.query.roast;
  let price = req.query.price;
  let country = req.query.country;
  console.log(roast, price, country);

  let query = "SELECT * FROM products WHERE 1=1"; // Initial query string

  let queryParams = [];

  // Check and append filters to the query
  if (product_name) {
    query += " AND product_name LIKE ?";
    queryParams.push(`%${product_name}%`);
  }

  if (roast && roast !== "-") {
    query += " AND roast_level like ?";
    queryParams.push(`%${roast}%`);
  } console.log(roast);

  if (price && price !== "-") {
    if (price === "Low") {
      query += " AND price < ?";
      queryParams.push(5); // Adjust this value according to your price range
    } else if (price === "High") {
      query += " AND price >= ?";
      queryParams.push(5); // Adjust this value according to your price range
    }
  }

  if (country && country !== "-") {
    query += " AND country = ?";
    queryParams.push(country);
  }

  connection.query(query, queryParams, function (error, results) {
    if (error || results.length === 0) {
      return res.send({
        error: true,
        message: "Products not found.",
      });
    }
    return res.json({
      error: false,
      data: results,
      message: "Products retrieved",
    });
  });
});

// Retrieve product from table products with ID
router.get("/product/:product_name", function (req, res) {
  let product_name = req.params.product_name;

  if (!product_name) {
    return res.send({ error: true, message: "Please provide product id." });
  }

  connection.query(
    "SELECT * FROM products where product_name like ?",
    product_name,
    function (error, results) {
      if (error || results.length === 0)
        return res.send({
          error: true,
          message: "Product is not found.",
        });
      return res.json({
        error: false,
        data: results,
        message: "Product retrieved",
      });
    }
  );
});

// Add product into table products
router.post("/product", function (req, res) {
  let product = req.body;

  if (!product) {
    return res.send({
      error: true,
      message: "Please provide product information",
    });
  }

  connection.query("INSERT INTO products SET ? ", product, function (error, results) {
    if (error)
      console.log(error);
    return res.send({
      error: true,
      message: "The product cannot be inserted.",
    });
    return res.send({
      error: false,
      data: results.affectedRows,
      message: "New product has been created successfully.",
    });
  });
});

// Testing Insert a new poduct
// method: post
// URL: http://203.159.93.114:8038/productserviceswithjwt/product
// body: raw JSON
// {
//  "id": 4,
//  "product_name": "Arabica",
//  "price": 12,
//  "roast_level": "Dark roasted",
//  "image": "image4.jpg",
//  "country": "America"
// }

//  Update table products with ID
router.put("/product", authorize, function (req, res) {
  let product_id = req.body.id;
  let product = req.body;

  if (!product_id || !product) {
    return res.send({
      error: true,
      message: "The product information is required.",
    });
  }

  connection.query(
    "UPDATE products SET ? WHERE ID = ?",
    [product, product_id],
    function (error, results) {
      if (error)
        return res.send({
          error: product,
          message: "The product cannot be update.",
        });
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "product has been updated successfully.",
      });
    }
  );
});

// Testing Update a poduct
// method: put
// URL: http://203.159.93.114:8038/productserviceswithjwt/product
// body: raw JSON
// {
//  "id": 4,
//  "product_name": "Arabica",
//  "price": 8,
//  "roast_level": "Light roasted",
//  "image": "image4.jpg",
//  "country": "America"
// }

//  Delete product from table products with ID
router.delete("/product", authorize, function (req, res) {
  let product_id = req.body.id;

  console.log(product_id);

  if (!product_id) {
    return res.send({ error: true, message: "Please provide product id" });
  }
  connection.query(
    "DELETE FROM products WHERE ID = ?",
    [product_id],
    function (error, results) {
      if (error)
        return res.send({
          error: true,
          message: "The product cannot be deleted.",
        });
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "product has been deleted successfully.",
      });
    }
  );
});

// Testing Delete a poduct
// method: delete
// URL: http://203.159.93.114:8038/productserviceswithjwt/product
// body: raw JSON
// {
//  "id": 4,
//  "product_name": "Arabica",
//  "price": 8,
//  "roast_level": "Light roasted",
//  "image": "image4.jpg",
//  "country": "America"
// }

module.exports = router;
