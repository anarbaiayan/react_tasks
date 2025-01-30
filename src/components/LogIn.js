import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from "../UI/myButton"
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import * as Yup from "yup";

function LogIn({openLogin, onClose, onLogin}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!")
    }),
    onSubmit: values => {
      onLogin(values);
    }
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openLogin}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openLogin}>
          <Box sx={style}>
            <form className="registerForm" onSubmit={formik.handleSubmit}>
              <p>Login</p>
              <div>
                <TextField id="outlined-basic" label="Email" variant="outlined" name='email'
                  onChange={formik.handleChange} />
                {formik.errors.email && formik.touched.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
              <div>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" name='password'
                  onChange={formik.handleChange} />
                {formik.errors.password && formik.touched.password && (
                  <p>{formik.errors.password}</p>
                )}
              </div>
              <Button type="submit" text="Login" />
            </form>
          </Box>
        </Fade>
      </Modal>

    </>
  )
}

export default LogIn