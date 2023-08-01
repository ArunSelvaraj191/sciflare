import { useCallback, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

interface dataState {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const baseURL = "http://localhost:5000/api";

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<dataState>({
    username: "",
    password: "",
  });

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    console.log("change", name, value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show);
  }, []);

  const saveDisable = useCallback(() => {
    let disable = true;
    disable = Object.values(data).every((ele) => ele) ? false : true;
    return disable;
  }, [data]);

  const login = useCallback(() => {
    const headers = {
      Authorization: "Bearer sciflare",
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseURL}/login`, data, { headers })
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem("user_data", JSON.stringify(response?.data));
          toast("Login Successfully", { type: "success" });
          navigate("/dashboard", { state: response?.data });
        } else {
          toast("Something went wrong.!", { type: "warning" });
        }
      })
      .catch((error) => {
        toast(error?.response?.data?.message, { type: "error" });
      });
  }, [data]);

  return (
    <>
      <Box>
        <Card sx={{ maxWidth: 800, height: "320px", width: "100%" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
            Login
          </Typography>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Username"
                  name="username"
                  variant="standard"
                  placeholder="Enter a Username"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  variant="standard"
                  placeholder="Enter password"
                  onChange={handleOnChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{ mr: 2 }}
            >
              Signup
            </Button>
            <Button
              size="large"
              variant="contained"
              disabled={saveDisable()}
              onClick={login}
            >
              Login
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Login;
