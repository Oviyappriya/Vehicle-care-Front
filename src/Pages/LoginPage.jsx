import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginPage(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "https://vehicle-care-back.onrender.com/login",
        {
          email,
          password,
        },{withCredentials: true},
      );
      setUser(response.data);
      alert("Login succesful.");
      setRedirect(true);
    } catch (e) {
      alert("Login failed.");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              className="form-control"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-4"
              placeholder="password"
              autoComplete="current-password"
              required
            />
            <button
              onClick={handleLoginPage}
              className="btn btn-primary btn-block mt-3"
            >
              Login
            </button>
            <div className=" pt-2 text-secondary">
              Not having an account yet?{" "}
              <Link to={"/register"}>Register now </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
