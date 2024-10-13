import { logout } from "../../../../Util/AuthSetGet";
import "./LogoutUserPage.min.css";
import { Link } from "react-router-dom";

const Logout = ({ updateUser }) => {
  const handleLogout = () => {
    if (localStorage.getItem("USER") != null) {
      updateUser(logout());
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="card logout-form p-5 border-0 bg-light shadow">
          <p className="card-title">Are you Sure. You wants to logout!</p>
          <div className="card-body d-flex flex-row gap-5 align-items-center justify-content-center">
            <Link to={"/"} className="btn btn-primary px-4 rounded-3">
              No
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-danger px-4 rounded-3"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
