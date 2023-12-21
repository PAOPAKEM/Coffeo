axios = require("axios").default;
express = require("express");
router = express.Router();

jwt = require("jsonwebtoken");
authorize = require("../middlewares/auth");

let searchURL = "http://203.159.93.114:8038/userserviceswithjwt/users";

let getUsers = async (token) => {
    try {
      let response = await axios.get(searchURL, {
        responseType: "json",
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
      console.log(`Use Async/Await`);
      console.log(`The number of results: ${response.data.data.length}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return { error: true , message: "Internal Server Error"};
    }
  };

router.get("/", async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if(!token) {
    return res.status(401).json({ error: true, message: "Authentication failed!" });
  }
  res.json(await getUsers(token));
});

module.exports = router;