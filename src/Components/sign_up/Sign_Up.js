import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sign_Up.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        setServerError(
          responseData?.error || "Registration failed. Try again."
        );
        return;
      }

      // Nếu thành công, lưu vào sessionStorage và chuyển hướng
      sessionStorage.setItem("name", responseData.name);
      sessionStorage.setItem("phone", responseData.phone);
      sessionStorage.setItem("email", responseData.email);
      sessionStorage.setItem("role", responseData.role);

      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-s">
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1">
          Already a member?
          <span>
            <Link to="/login"> Login</Link>
          </span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <small className="error">{errors.role}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
            </div>

            {serverError && <div className="error-message">{serverError}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
