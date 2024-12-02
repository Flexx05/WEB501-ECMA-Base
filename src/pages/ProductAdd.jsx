import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const nav = useNavigate();

  async function onSubmit(data) {
    try {
      await axios.post("http://localhost:3000/products", data);
      toast.success("Thêm thành công");
      nav("/product/list");
    } catch (error) {
      toast.error("Lỗi", error);
    }
  }
  return (
    <div>
      <h1>Product Add</h1>
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
export default ProductAdd;
