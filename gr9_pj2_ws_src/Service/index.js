const express = require("express");
const app = express();

const callservices = require("./routing/callservices");
const userserviceswithjwt = require("./routing/userserviceswithjwt");
const userservices = require("./routing/userservices");
const productserviceswithjwt = require("./routing/productserviceswithjwt");

PORT = process.env.PORT;

app.use("/callservices", callservices);
app.use("/userserviceswithjwt", userserviceswithjwt);
app.use("/productserviceswithjwt", productserviceswithjwt);
app.use("/userservices", userservices);

app.get("/", function (req, res) {
  res.send("Root");
});

// Server running on the port: 8038
app.listen(PORT, function () {
  console.log(`Server listening at Port ${PORT}`);
});