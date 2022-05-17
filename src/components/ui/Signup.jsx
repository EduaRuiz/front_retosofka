import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  Stack,
  Snackbar,
} from "@mui/material";

import bg from "../../assets/img/bgLogin.jpg";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import SignupService from "../../services/signupService";

const lastPath = localStorage.getItem("lastPath") || "/";

const initialSignup = {
  username: {
    name: "username",
    value: "",
    label: "Usuario",
    error: false,
    regularExpression: /^[a-zA-Z0-9_-]{1,20}$/,
    message: "",
    errorMessage: "Hasta 20 caracteres sin espacios.",
  },
  password: {
    name: "password",
    value: "",
    label: "Contraseña",
    regularExpression: /^[a-zA-Z0-9!@#$%^&.*]{1,20}$/,
    message: "",
    errorMessage: "Hasta 20 caracteres sin espacios o caracteres especiales",
    error: false,
  },
  fullName: {
    name: "fullName",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    message: "",
    errorMessage: "Entre 3 y 40 caracteres",
    error: false,
  },
  email: {
    name: "email",
    value: "",
    label: "Correo electrónico",
    regularExpression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "",
    errorMessage: "Correo electrónico inválido",
    error: false,
  },
};

export const Signup = () => {
  const baseURL = "http://localhost:8080";
  const { alert, setAlert, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signup, setSignup] = useState(initialSignup);
  const [exist, setExist] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(true);

  const allOk = (e) => {
    e.preventDefault();
    currentPlayer(signup.email.value);
    handleSignup();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newPlayer = {
      emailPlayer: signup.email.value,
      namePlayer: signup.fullName.value,
      passwor: signup.password.value,
      username: signup.username.value,
      level: 1,
      score: 0,
      idRol: 1,
    };
    await SignupService.savePlayer(newPlayer)
      .then((res) => {
        let accesToken = res.data.access_token;
        let refreshToken = res.data.refresh_token;
        let {
          fullNamePlayer,
          levelPlayer,
          scorePlayer,
          authorities,
          exp,
          idPlayer,
        } = jwt_decode(res.data.access_token);
        dispatch({
          type: types.signup,
          payload: {
            name: fullNamePlayer,
            scorePlayer: scorePlayer || [],
            levelPlayer: levelPlayer || [],
            accessToken: accesToken,
            refreshToken: refreshToken,
            authorities: authorities || [],
            exp: exp,
            idPlayer: idPlayer,
          },
        });
        navigate(lastPath);
        setAlert({
          openAlert: true,
          severity: "success",
          message: `Bienvenid@ ${fullNamePlayer}`,
        });
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setExist(true);
          setSignup((prevState) => ({
            ...prevState,
            username: { ...prevState.username, error: true, message: "" },
            password: { ...prevState.password, error: true, message: "" },
          }));
          setAlert({
            openAlert: true,
            severity: "warning",
            message: "Usuario y/o contraseña incorrectos",
          });
        } else {
          console.log(err.response);
        }
      });
  };

  const currentPlayer = async (e, id) => {
    console.log(id);
    await SignupService.findPlayer(baseURL, signup.email.value)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignup((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value: value },
    }));
    setSubmitBtn(false);
  };

  const handleSubmit = () => {
    if (signup.username.error || signup.password.error) {
      setSubmitBtn(true);
    }
  };

  const validate = (e) => {
    const { name, value } = e.target;
    console.log(name);
    let re = signup[name].regularExpression;
    console.log(re);
    let em = signup[name].errorMessage;
    if (!re.test(String(value))) {
      setSignup((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: true, message: em },
      }));
      setSubmitBtn(true);
    } else {
      setSignup((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: false, message: "" },
      }));
      setSubmitBtn(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid container component="main" sx={{ height: "95%", width: "90%" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6.5}
          component={Paper}
          elevation={12}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5.5}
          component={Paper}
          elevation={12}
          square
          sx={{
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Box
            sx={{
              my: "10%",
              mx: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h6"
              variant="h6"
              sx={{ m: "1%", my: "1%", color: "secondary.main" }}
            >
              {"Registrarse"}
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              sx={{ m: "2%", my: "1%", color: "primary.main" }}
            >
              {"NakamaTrivia"}
            </Typography>
            <Box component="form" noValidate onSubmit={allOk} sx={{ my: "1%" }}>
              <TextField
                size="small"
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={signup.email.error}
                helperText={signup.email.message}
                name={signup.email.name}
                label={signup.email.label}
                value={signup.email.value}
                id={signup.email.name}
                margin="normal"
                required
                fullWidth
                type="email"
                autoComplete="current-email"
              />
              <TextField
                size="small"
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={signup.fullName.error}
                helperText={signup.fullName.message}
                name={signup.fullName.name}
                label={signup.fullName.label}
                value={signup.fullName.value}
                id={signup.fullName.name}
                margin="normal"
                required
                fullWidth
                type="name"
                autoComplete="current-name"
              />
              <TextField
                size="small"
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={signup.username.error}
                helperText={signup.username.message}
                name={signup.username.name}
                label={signup.username.label}
                value={signup.username.value}
                id={signup.username.name}
                margin="normal"
                required
                fullWidth
                type="username"
                autoComplete="current-username"
              />
              <TextField
                size="small"
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={signup.password.error}
                helperText={signup.password.message}
                name={signup.password.name}
                label={signup.password.label}
                value={signup.password.value}
                id={signup.password.name}
                margin="normal"
                required
                fullWidth
                type="password"
                autoComplete="current-password"
              />
              {exist && (
                <Alert severity="warning">
                  Usuario y/o contraseña incorrectos
                </Alert>
              )}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                type="submit"
                disabled={submitBtn}
                fullWidth
                variant="contained"
                sx={{ my: "3%" }}
                onClick={handleSubmit}
              >
                Ingresar al sistema
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={alert.openAlert}
          autoHideDuration={6000}
          onClose={() =>
            setAlert((prevState) => ({
              ...prevState,
              openAlert: false,
            }))
          }
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={() =>
              setAlert((prevState) => ({
                ...prevState,
                openAlert: false,
              }))
            }
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    </Grid>
  );
};
