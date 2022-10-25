import React ,{useEffect}from "react";
import { Formik } from "formik";
import axios from "axios";
import {
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Button,
  Radio,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

function FormikComponent() {
    const [userData,setdata]=useState([]);
    const [formData,setformdata]=useState([{}])

    useEffect(()=>{
        async function getdata(){
           const res = await axios.get("https://6320be7482f8687273a6d96b.mockapi.io/library")
           console.log(res.data);

           setdata(res.data)
        }
        getdata()

       


    },[])
       


  const validateForm = (formData) => {
    var errors = {};
    if (formData.name === "") errors.name = "Name is Required";
    if (formData.age === "") errors.age = "Age is Required";
    if (formData.email === "") errors.email = "Email is Required";
    if (formData.gender === "") errors.gender = "Gender is Required";
    if (formData.Books === "") errors.Books = "Books is Required";
    return errors;
  };
  const handleSubmit = async (formData, { resetForm }) => {
   const res= await axios.post("https://6320be7482f8687273a6d96b.mockapi.io/library",{
    Name : formData.name,
    Age : formData.age,
    Email:formData.email,
    Gender: formData.gender,
    Books:formData.Books

}

    )
    setdata([...userData , res.data])
    
    setTimeout(() => {
      console.log(formData);
      resetForm();
    }, 3000);
  };

  const onPopulateData = (id)=>{
   const data= userData.filter((row)=>row.id===id)[0]
   console.log(data);

   
  
  
   
   
   
  }

   const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://6320be7482f8687273a6d96b.mockapi.io/library/${id}`
    );
    console.log(response);
    const user = userData.filter((row) => row.id !== response.data.id);
    setdata(user);
  };

  
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Library Management Formik Form
      </Typography>
      <Formik
        initialValues={{
          name: "",
          age: "",
          email: "",
          gender: "",
          Books: "",
        }}
        validate={(formData) => validateForm(formData)}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
         
        }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
        
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="Name"
              variant="standard"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.name && errors.name}</span>
            <br />
            <TextField
              id="age"
              label="Age"
              variant="standard"
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.age && errors.age}</span>
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="standard"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.email && errors.email}
            </span>
            <br /> <br />
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <span style={{ color: "red" }}>
              {touched.gender && errors.gender}
            </span>
            <br /> <br />
            <FormControl fullWidth>
              <InputLabel id="Books">Books</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Books"
                name="Books"
                value={values.Books}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Tamil">Tamil books</MenuItem>
                <MenuItem value="English">English books</MenuItem>
                <MenuItem value="Story">Story books</MenuItem>
              </Select>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.Books && errors.Books}
            </span>
            <br /> <br />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button variant="contained" type="button" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </Formik>

      <h3> User Data </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Books</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Age}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Gender}</TableCell>
                <TableCell>{row.Books}</TableCell>
                <TableCell>
                  <Button style={{border : "solid black 2px",margin :"10px",backgroundColor:"blue",color:"white"}}  onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>
                  <br />
                  <Button color="error"  style={{border : "solid black 2px",backgroundColor:"red",color:"white"}} onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        


    </div>
  );
}

export default FormikComponent;