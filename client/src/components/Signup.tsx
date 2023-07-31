import { useCallback, useState, useEffect, ChangeEvent, FocusEvent } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Grid,
  Autocomplete,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
// import CONFIG from '../../config/index'


interface dataState {
  username: string;
  age: number;
  role: string;
  email: string;
  password: string;
  cpassword: string;
}

const Signup = () => {
  // States

  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  console.log('isValidPassword :::', isValidPassword )
  const [data, setData] = useState<dataState>({
    username: '',
    age: 0,
    role: '',
    email: '',
    password: '',
    cpassword: ''
  })

  console.log('data :::', data)

  // Methods

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    console.log('change', name, value)
    if (name === 'age') {
      const regex = /^[0-9]{0,2}$/;
      if (regex.test(value)) {
        setData((prev: any) => ({
          ...prev,
          [name]: value
        }))
      }
    }
    else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }, [])

  const handleOnBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    if (name === 'email') {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i;
      setIsValidEmail(emailRegex.test(value));
    }
    else if(name === 'password' || name === 'cpassword'){
      console.log('data?.password !== data?.cpassword',data?.password !== data?.cpassword)
      if(data?.password !== data?.cpassword){
        setIsValidPassword(true);
      }else{
        setIsValidPassword(false);
      }
    }

  }, [data])

  const handleClickShowPassword = useCallback(
    (name: string) => () => {
      console.log(name);
      name == "password"
        ? setShowPassword((show) => !show)
        : setCShowPassword((show) => !show);
    },
    []
  );

  const saveDisable = useCallback(() => {
    let disable = true;
    console.log('>>>>', Object.values(data).every((ele) => ele), data)
    if (Object.values(disable).every((ele) => ele)) {
      disable = false;
    }
    return disable;
  }, [data])

  const save = useCallback(()=>{
    const payload = data;
    
    axios.post('http://localhost:5000/api/register', payload)
      .then(response => {
        console.log('Post created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  },[data])

  useEffect(() => {
    const header = {
      'Authorization': 'Bearer sciflare',
      'Content-Type': 'application/json',
    };
    const apiUrl = 'http://localhost:5000/api/'; 

    axios.get(apiUrl, {
      headers: header
    })
      .then((response : any) => {
        // setData(response.data); 
      })
      .catch((error: Error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Box>
        <Card sx={{ maxWidth: 800, height: "380px", width: "100%" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
            SIGNUP
          </Typography>
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="User Name"
                  name='username'
                  variant="standard"
                  placeholder="Enter user name"
                  onChange={handleOnChange}
                  sx={{ my:1 }}
                />
                <FormControl fullWidth sx={{ my:1 }}>
                  <InputLabel sx={{ml:'-10px'}}>Role</InputLabel>
                  <Select
                    name='role'
                    value={data.role}
                    label="Role"
                    variant='standard'
                    onChange={handleOnChange}
                  >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  variant="standard"
                  placeholder="Enter password"
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword("password")}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ my:1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  label="Age"
                  name='age'
                  value={data?.age ? data?.age : ''}
                  variant="standard"
                  placeholder="Enter age"
                  onChange={handleOnChange}
                  type="number"
                  sx={{ my:1 }}
                />
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name='email'
                  variant="standard"
                  placeholder="Enter email"
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  error={!isValidEmail}
                  helperText={!isValidEmail && 'Enter Valid Email'}
                  sx={{ my:1 }}
                />
                <TextField
                  fullWidth
                  required
                  name="cpassword"
                  label="Confirm Password"
                  variant="standard"
                  placeholder="Enter password again"
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  type={cshowPassword ? "text" : "password"}
                  error={isValidPassword}
                  helperText={isValidPassword && "Password doesn't match.!"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword("cpassword")}
                        >
                          {cshowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ my:1 }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Button size="large" variant='contained' disabled={saveDisable()} onClick={save}>Submit</Button>
        </Card>
      </Box>
    </>
  );
};

export default Signup;
