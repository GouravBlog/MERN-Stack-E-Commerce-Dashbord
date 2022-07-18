import React, { useState } from "react";
import "./Add_Product.css";
import { useNavigate } from "react-router-dom";

const Add_Product = () => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [company, setCompany] = useState("");
  let navigate = useNavigate();

  const auth = localStorage.getItem("user");

  let submitForm = async (e) => {
    e.preventDefault();

    let userId = JSON.parse(auth)._id;
    // console.log(name, price, category, company, userId);
    let result = await fetch("http://localhost:5000/addProduct", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    if (result) {
      navigate("/");
    }
  };
  return (
    <div>
      <div className="signup">
        <h2>Add Product</h2>
        <form action="" onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />

          <input
            type="text"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
          />

          <input
            type="text"
            placeholder="Enter Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoComplete="off"
          />

          <input
            type="text"
            placeholder="Enter Product Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="off"
          />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Add_Product;
