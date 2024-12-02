import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      console.log(res.data);
      localStorage.setItem("token", res.data.accessToken);
      toast.success("Thành công");
    } catch (error) {
      toast.error("Lỗi", error);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelpId"
              {...register("email", {
                required: "email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ!",
                },
              })}
            />
            <small className="text-danger">{errors.email?.message}</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Mật khẩu có tối thiểu 8 ký tự",
                },
              })}
            />
            <small className="text-danger">{errors.password?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
