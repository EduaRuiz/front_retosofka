import { useEffect, useState, useContext } from "react";
import bg from "../../../assets/img/bgLogin.jpg";
import { AuthContext } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Modal,
  Button,
} from "@mui/material";
import questionService from "../../../services/questionService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Level1 = (props) => {
  const baseURL = "http://localhost:8080";
  const navigate = useNavigate();
  const { setAlert, logout, player, setScore, setLevel, setQuestion } =
    useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState(player.levelPlayer);
  const [open, setOpen] = useState(false);

  const handleClicked = (answer) => {
    if (answer === "NewGame") {
      player.scorePlayer = 0;
      player.levelPlayer = 1;
      setCategory(1);
      setScore(0);
      setLevel(1);
      //setPlayer(player);
      localStorage.setItem("user", JSON.stringify(player));
    }
    getData();
    handleOpen();
  };

  const selectQuestion = (data) => {
    var rand = Math.floor(Math.random() * data.length);
    const questionSelected = data[rand];
    setQuestion(questionSelected);
    console.log(questionSelected);
    console.log(data);
    console.log(category);
  };

  const getData = async () => {
    await questionService
      .getQuestionsByCategory(baseURL, category)
      .then((res) => {
        selectQuestion(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleError = (err) => {
    switch (err.response?.status) {
      case 401:
        setAlert({
          openAlert: true,
          severity: "warning",
          message: "La sesión ha expirado, por favor inicie sesión nuevamente!",
        });
        logout();
        break;
      case 403:
        setAlert({
          openAlert: true,
          severity: "warning",
          message:
            "Acceso denegado, no tiene permisos para realizar esta acción!",
        });
        navigate("/");
        break;
      case 400 || 404:
        setAlert({
          openAlert: true,
          severity: "error",
          message: err.response.data.error,
        });
        break;
      default:
        console.log(err);
        break;
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSent = () => {
    navigate("/Game");
  };

  useEffect(() => {
    setCategory(player.levelPlayer);
    if (player.levelPlayer === 1) {
      setOptions([{ label: "Comenzar", go: "NewGame" }]);
    } else {
      setOptions([
        { label: "Continuar", go: "Continue" },
        { label: "Nuevo Juego", go: "NewGame" },
      ]);
    }
  }, [player.levelPlayer]);

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "75vh" }}
      >
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            align="center"
            sx={{ width: "80%" }}
          >
            Bienvenido {player.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardMedia component="img" image={bg} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            aria-label="contacts"
          >
            {" "}
            {options.map((option) => (
              <ListItem key={option?.label} disablePadding>
                <ListItemButton onClick={() => handleClicked(option?.go)}>
                  <ListItemText primary={option?.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => handleOpen()}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Buena suerte
          </Typography>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            Recuerda que si fallas una pregunta volveras desde cero.
          </Typography>
          <div align="center" style={{ padding: 6 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ mx: 3, my: 1 }}
              onClick={handleSent}
            >
              CONTINUAR
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mx: 3, my: 1 }}
              onClick={handleOpen}
            >
              CANCELAR
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Level1;
