import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const nav = useNavigate();
  const params = useParams();

  async function getProDetail(id) {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    reset(res.data);
  }

  useEffect(() => {
    getProDetail(params.id);
  }, []);

  async function onSubmit(data) {
    try {
      await axios.put(`http://localhost:3000/products/${params.id}`, data);
      toast.success("Sửa thành công");
      nav("/product/list");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <h1>Product Edit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              {...register("name", {
                required: "Name is required!",
              })}
            />
            <small className="text-danger">{errors.name?.message}</small>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              {...register("image", {
                required: "Image is required!",
              })}
            />
            <small className="text-danger">{errors.image?.message}</small>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              {...register("price", {
                required: "Price is required!",
                min: {
                  value: 0,
                  message: "Giá không được âm",
                },
              })}
            />
            <small className="text-danger">{errors.price?.message}</small>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select className="form-select" {...register("category")}>
              <option value="HP">HP</option>
              <option value="DELL">DELL</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default ProductEdit;
