import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom"
import { Box, Button, createTheme, Modal, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify"
// import Otpveify from "../../components/otp/Otpveify";


const theme = createTheme({
  typography: {
    body1: {
      color: "red",
    },
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    console.log("not value");
    errors.username = "Required";
  } else if (values.username.length > 15) {
    console.log("not length");
    errors.username = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 10) {
    errors.phone = "phone number must be 10 numbers";
  } else if (values.phone.length > 10) {
    errors.phone = "phone number must be only 10 numbers";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be 8 character long ";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "password must be 8 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
  return errors;
};




const Register = () => {



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()



  const generateError = (error) => {
    console.log("jvvh");
    console.log(error);
    toast.error(error, {
      position: "bottom-right",
    });
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      country: "",
      city: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async(values) => {
      await axios.post("/auth/register",values).then((response)=>{
        
        // handleOpen();
        console.log(response);
        if(response.data){
          // handleOpen()
          console.log(response);
          navigate("/login");
        }
      })
    },
  }); 


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
            <h1 className="mb-8 text-3xl text-center">SIGN UP</h1>
          
            <ThemeProvider theme={theme}>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <Typography variant="body1">{formik.errors.username}</Typography>
            ) : null}
        
        

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <Typography variant="body1">{formik.errors.email}</Typography>
            ) : null}

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="country"
              placeholder="Country"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
            {formik.errors.country ? (
              <Typography variant="body1">{formik.errors.country}</Typography>
            ) : null}

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="city"
              placeholder="City"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.errors.city ? (
              <Typography variant="body1">{formik.errors.city}</Typography>
            ) : null}

            <input
              type="number"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone"
              placeholder="Mob Number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone ? (
              <Typography variant="body1">{formik.errors.phone}</Typography>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <Typography variant="body1">{formik.errors.password}</Typography>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword ? (
              <Typography variant="body1">
                {formik.errors.confirmPassword}
              </Typography>
            ) : null}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-darkgreen text-white hoverborder-b-gray-900 focus:outline-none my-1"
            >
              Create Account
            </button>
            </ThemeProvider>
          </div>
          <Link to="/login">
            <div className="text-grey-dark mt-6 no-underline border-b border-blue text-blue">
              Already have an account? Login
            </div>
          </Link>

          
        </div>
                        
<Modal 
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
 
  <Box className="border-2 border-black border-double  bg-white" sx={{position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 565,
  p: 4}}>
     
     {/* <Otpveify/> */}
    <button className="bg-darkgreen text-white rounded-sm fon">Submit</button>
  </Box>

</Modal>
      </div>
     

 


    </form>
  );
};

export default Register;
