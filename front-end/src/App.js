// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Add_Product from "./components/Add_Product";
import PrivateComponent from "./components/PrivateComponent";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/addProduct" element={<Add_Product />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>this is logout </h1>} />
          </Route>

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
