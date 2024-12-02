import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  async function getProductList() {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Lỗi", error);
    }
  }
  async function delProduct(id) {
    if (confirm("Chắc không?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        toast.success("Xóa thành công");
        nav("/product/list");
        getProductList();
      } catch (error) {
        toast.error("Lỗi", error);
      }
    }
  }

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.image}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <a href={`/product/edit/${product.id}`}>
                    <button className="btn btn-warning">Sửa</button>
                  </a>
                  <button
                    onClick={() => delProduct(product.id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;
