import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyButton from "../UI/myButton";
import { useFormik } from "formik";
import * as Yup from "yup";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddUser({ onAdd }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!")
    }),
    onSubmit: values => {
      onAdd(values);
      setOpen(false);
    }
  });


  return (
    <div className="add_user">
      <h2>User Table</h2>
      <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} >
          <form className="add_user__modal" onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                size="small"
                id="outlined-required"
                placeholder="Name"
                type="text"
                name="name"
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </div>
            <div>
              <TextField
                size="small"
                id="outlined-required"
                placeholder="Email"
                type="text"
                name="email"
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            <div className="add_user__button">
              <MyButton bgcolor="green" color="white" text="Add" type="submit" />
              <MyButton text="Close" />
            </div>
          </form>
        </Box>
      </Modal>

      <MyButton text="Add" onClick={handleOpen} />
    </div>
  );
}

export default AddUser;
