import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import  {useFormik}  from "formik"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import  {toast,ToastContainer}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otp from '../otp/otp'

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
    errors.password = "phone number must be 8 character long ";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "phone number must be 8 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
return errors;
};

function LogIn() { 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      country:"",
      city:"",
      password: "",
      confirmPassword: "",
    },
    validate,
    // onSubmit: async(values) => {
    //   if(values){
    //     handleOpen()
    //   }
    //   console.log(JSON.stringify(values, null, 2));
      
    //   const data = await axios.post('http://localhost:5000/user/signup',values)
    
    //   if (data.data.created) {
    //     console.log("locallllllllllll");
    //     localStorage.setItem("token", data.data.token);
    //     localStorage.setItem("userInfo", JSON.stringify(data.data));
    //   }
    //   if(data.data){
    //   if(data.data.errors){
    //     console.log("erorrr");
    //     const{email,password}=data.data.errors;
    //     if(email){
    //       console.log("emaillllll");
    //       generateError(email)
    //     }else if(password){
    //       generateError(password)
    //     }

    //   }
    // }
    // },

    onSubmit:async(values)=>{
await axios.post('http://localhost:5000/user/sentotp',values).then((response)=>{

  if(response.data){
 
   if(response.data.otpSent){
   handleOpen()
    
   }else if(response.data.emailDuplicate){
    console.log("emailldupl");
generateError("Email already registered")
   }
   else if(response.data.phone_numberDuplicate){
    generateError("Phone number already registered")
   }

    }
  
})
    }
  
  });

  const generateError = (error) => {
    console.log("jvvh");
    console.log(error);
    toast.error(error, {
      position: "bottom-right",
    });
  };
  

  return (
    <>
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={8}
          marginBottom={8}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #051b34",
            },
          }}
        >
          <ThemeProvider theme={theme}>
          
            <TextField
              fullWidth
              type={"text"}
              margin="normal"
              variant="outlined"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              name="firstname"
              placeholder="First name"
            />
            {formik.errors.firstname ? (
              <Typography variant="body1">{formik.errors.firstname}</Typography>
            ) : null}
            <TextField
              fullWidth
              type={"text"}
              margin="normal"
              variant="outlined"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              name="lastname"
              placeholder="Last name"
            />
            {formik.errors.lastname ? (
              <Typography variant="body1">{formik.errors.lastname}</Typography>
            ) : null}
            <TextField
              fullWidth
              type={"email"}
              margin="normal"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              placeholder="email"
            />
            {formik.errors.email ? (
              <Typography variant="body1">{formik.errors.email}</Typography>
            ) : null}
            <TextField
              fullWidth
              type={"text"}
              margin="normal"
              variant="outlined"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              name="phone_number"
              placeholder="mobile number"
            />
            {formik.errors.phone_number ? (
              <Typography variant="body1">
                {formik.errors.phone_number}
              </Typography>
            ) : null}
            <TextField
              fullWidth
              type={"password"}
              margin="normal"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              placeholder="password"
            />
            {formik.errors.password ? (
              <Typography variant="body1">{formik.errors.password}</Typography>
            ) : null}
            <TextField
              fullWidth
              type={"password"}
              margin="normal"
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              placeholder="confirm password"
            />
            {formik.errors.confirmPassword ? (
              <Typography variant="body1">
                {formik.errors.confirmPassword}
              </Typography>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "10px",
                backgroundColor: "#051b34",
                ":hover": { backgroundColor: "#27285C" },
              }}
            >
              Sign Up
            </Button>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 565,
  p: 4}}>
    <Otp />
    
  </Box>
  
</Modal>
<Button className="w-15 h-15 bg-amber-500">
    submit
  </Button>
            
            </ThemeProvider>
            </Box>
        </form>
        <ToastContainer />
        </div>
        </>
        
  );
}

export default LogIn;