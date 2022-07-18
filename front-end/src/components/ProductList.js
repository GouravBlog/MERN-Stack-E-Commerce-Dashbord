import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  let [products, setProducts] = useState([]);
  let params = useParams();

  const updateProduct = () => {};

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

  const searchProduct = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProduct();
    }
  };

  return (
    <>
      <h1 className="h2">product</h1>
      <input
        type="text"
        placeholder="Search"
        autoComplete="off"
        onChange={searchProduct}
        className="inputBox"
      />
      <div className="table-responsive ">
        <table className="table table-bordered table-hover ">
          <thead>
            <tr>
              <th className="ulli">S NO.</th>
              <th className="ulli">NAME</th>
              <th className="ulli">PRICE</th>
              <th className="ulli">CATEGORY</th>
              <th className="ulli">COMPANY</th>
              <th className="ulli">OPERATIONS</th>
            </tr>
          </thead>
          {products.map((data, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td className="ulli ">{index + 1}</td>
                  <td className="ulli">{data.name}</td>
                  <td className="ulli">{data.price}</td>
                  <td className="ulli">{data.category}</td>
                  <td className="ulli">{data.company}</td>
                  <td className="ulli">
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => deleteProduct(data._id)}
                    ></i>
                    <Link
                      to={"/updateproduct/" + data._id}
                      onClick={updateProduct}
                      style={{ color: "blue" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ProductList;
