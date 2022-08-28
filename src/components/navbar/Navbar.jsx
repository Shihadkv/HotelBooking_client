import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    setClick(true);
    localStorage.clear();
    dispatch({ user: null });
    //  window.location.reload(true);
    navigate("/");
  };

  // useEffect(()=>{

  // },[state])

  return (
    <div className="navbar">
      <div className="navContainer">
        <div>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">ShihuBooking</span>
          </Link>
        </div>

        {user && !click ? (
          <div className="uppercase m-2 ">
            <button className="m-3 p-1 bg-white text-black rounded-md"> {user.username}{""}</button>
            
            <button
              className="m-3  bg-white text-black rounded-md navButton "
              onClick={handleClick}
            >
              logout
            </button>{" "}
          </div>
        ) : (
          <div className="navItems">
            <button
              onClick={() => navigate("/login")}
              style={{ color: "inherit", textDecoration: "none" }}
              className="navButton"
            >
              Login
            </button>
          </div>
        )}
        {/* <div className="navItems">
          <button className="bg-white text-black rounded-md p-1">
            Profile
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
