import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [company, setCompany] = useState("");
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  let submitForm = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };
  return (
    <div>
      <div className="signup">
        <h2>Update Product</h2>
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

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
