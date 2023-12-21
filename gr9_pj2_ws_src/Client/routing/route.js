const express = require("express");
const path = require("path");

const app = express();
const router = express.Router();
app.use(router);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Add HTML to Node.js Server
router.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/home2.html`));
});

router.get("/home", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/home.html`));
});

router.get("/product", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/Product2.html`));
});

router.get("/home/product", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/Product.html`));
});

router.get("/home/prod-manage", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/Product_Admin.html`));
});

router.get("/home/user-manage", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/user_admin.html`));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/about2.html`));
});

router.get("/home/about", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/about.html`));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/Login2.html`));
});

router.get("/home/login", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/Login.html`));
});

router.get("/add-prod", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/add_product.html`));
});

router.get("/update-prod", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/update_product.html`));
});

router.get("/add-user", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/add_admin.html`));
});

router.get("/user-admin", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/user_admin.html`));
});

router.get("/italian", (req, res) => {
  res.sendFile(
    path.join(`${__dirname}/view/html/Single_Product/Italian.html`)
  );
});

router.get('/signin', (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/html/signin.html`));
});

router.get('/signin-submit', (req, res) => {
  // |------------------------|
  // | Don't forget to modify |
  // |------------------------|
});

router.get('/update-user',(req,res)=>{
  res.sendFile(path.join(`${__dirname}/view/html/update_admin.html`));
})

// Search
router.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  const query = 'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?';
  try {
    const results = await db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`]);
    res.json(results);
  } catch (error) {
    res.status(500).send('Error on the server.');
  }
});

// CSS
router.get("/css/nav", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/nav.css`));
});

router.get("/css/home", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/home.css`));
});

router.get("/css/about", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/about.css`));
});

router.get("/css/product", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/Product.css`));
});

router.get("/css/prod-manage", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/Product_Admin.css`));
});

router.get("/css/single-prod", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/single_product.css`));
});

router.get("/css/user-admin", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/user_admin.css`));
});

router.get("/css/login", (req, res) => {
  res.sendFile(path.join(`${__dirname}/view/css/Login.css`));
});

// JS
router.get("/js/callProductService", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/callProductService.js`));
});

router.get("/js/ProductAdmin", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/ProductAdmin.js`));
});

router.get("/js/loginjwt", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/loginjwt.js`));
});

router.get("/js/login", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/new_login.js`));
});

router.get("/js/user-admin", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/UserAdmin.js`));
});

router.get("/js/ProductAdmin2", (req, res) => {
  res.sendFile(path.join(`${__dirname}/js/ProductAdmin2.js`));
});


module.exports = router;