const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const AddProduct = require("./db/AddProduct");
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");
const jwtKey = "e-comms";

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send("invalid credentials");
    }
    resp.send({ result, token: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("invalid credentials");
        }
        resp.send({ user, token: token });
      });
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.post("/addProduct", verifyToken, async (req, resp) => {
  let addProduct = new AddProduct(req.body);
  let result = await addProduct.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await AddProduct.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("data is not available");
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await AddProduct.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await AddProduct.findOne({ _id: req.params.id });
  res.send(result);
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await AddProduct.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await AddProduct.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send("please correct token");
      } else {
        next();
      }
    });
  } else {
    res.send("please add token");
  }
}
app.listen(5000);
