import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/login.json", params)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        setIsLoggedIn(true);
        event.target.reset();
        navigate("/members");
      })
      .catch(() => {
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" required />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-warning w-100">Log In</button>
        </form>
      </div>
    </div>
  );
}
