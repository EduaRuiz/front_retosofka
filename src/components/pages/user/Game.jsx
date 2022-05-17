import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ImgLv1 from "../../../assets/img/Level1.jpg";
import ImgLv2 from "../../../assets/img/Level2.webp";
import ImgLv3 from "../../../assets/img/Level3.jpg";
import ImgLv4 from "../../../assets/img/Level4.png";
import ImgLv5 from "../../../assets/img/Level5.jpg";
import ImgLv6 from "../../../assets/img/Level6.jpg";
import {
  Grid,
  Typography,
  CardMedia,
  Box,
  LinearProgress,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Button,
  Modal,
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

export const Game = (props) => {
  const baseURL = "http://localhost:8080";
  const images = [ImgLv1, ImgLv2, ImgLv3, ImgLv4, ImgLv5, ImgLv6];
  const navigate = useNavigate();
  const {
    setAlert,
    logout,
    player,
    level,
    setLevel,
    score,
    setScore,
    question,
    setQuestion,
  } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState(level);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(player?.scorePlayer);
  const [correct, setCorrect] = useState(true);

  const rango = [
    "un Rey Pirata",
    "un Supernova imparable",
    "un gran Shishibukai",
    "todo un Yonko",
    "el Rey de los Piratas!!",
  ];

  const handleClicked = (answer, q) => {
    const data = {
      question: question?.question,
      options: [],
      answer: answer,
      score: 0,
      idCategory: 1,
    };
    validateAnswer(data);
  };

  const selectQuestion = (data) => {
    var rand = Math.floor(Math.random() * data.length);
    const questionSelected = data[rand];
    setOptions(questionSelected?.options);
    setQuestion(questionSelected);
  };

  const correctAnwer = () => {
    setAlert({
      openAlert: true,
      severity: "success",
      message: "Respuesta Correcta",
    });

    setCorrect(true);
    player.scorePlayer = total + question?.score;
    player.levelPlayer = category;
    setCategory(category + 1);
    setLevel(category + 1);
    setScore(question?.score);
    setTotal(total + question?.score);
    //setPlayer(player);
    localStorage.setItem("user", JSON.stringify(player));
    setOpen(true);
  };

  const resestAll = () => {
    setCorrect(false);
    player.scorePlayer = 0;
    player.levelPlayer = 1;
    setCategory(1);
    setScore(0);
    setLevel(1);
    setTotal(0);
    //setPlayer(player);
    localStorage.setItem("user", JSON.stringify(player));
  };

  const incorrectAnwer = () => {
    setAlert({
      openAlert: true,
      severity: "error",
      message: "Respuesta Incorrecta",
    });
    resestAll();
    setOpen(true);
  };

  const validateAnswer = async (data) => {
    await questionService
      .validate(baseURL, player?.idPlayer, data)
      .then((res) => {
        if (res.data) {
          correctAnwer();
        } else {
          incorrectAnwer();
        }
      })
      .catch((err) => {
        console.log(data);
        handleError(err);
      });
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
    getData();
  };

  useEffect(() => {
    console.log(question);
    if (question === undefined && category < 5) {
      navigate("/");
    }
    setOptions(question?.options);
  }, [category, navigate, question]);

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
            {category < 6
              ? question?.question
              : "Felicidades eres el Rey de los Piratas"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardMedia component="img" image={images[category - 1]} />
        </Grid>
        {category < 6 ? (
          <Grid item xs={12} sm={6} md={4}>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              aria-label="contacts"
            >
              {options?.map((option) => (
                <ListItem key={option} disablePadding>
                  <ListItemButton
                    onClick={() => handleClicked(option, question?.question)}
                    color="error"
                  >
                    <ListItemText primary={option} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ mx: 3 }}
              onClick={resestAll}
            >
              Volver a Jugar
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                valueBuffer={(category - 1) * 20}
                value={(category - 1) * 20}
                {...props}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                (category - 1) * 20
              )}%`}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => handleOpen()}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {correct ? "Muy Bien!!" : "Es una pena"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            {correct
              ? `Ya eres ${rango[category - 2]}, aqui tienes ${score} puntos.
                Ya tienes ${total} puntos acumulados!!`
              : "Lo sentimos, Has peerdido todos tus puntos y volviste al nivel 1."}
          </Typography>
          <div align="center" style={{ padding: 6 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ mx: 3, my: 1 }}
              onClick={handleOpen}
            >
              {correct ? "continuar" : "Intentar nuevamente"}
            </Button>
            {!correct && (
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                sx={{ mx: 3, my: 1 }}
                onClick={() => navigate("/")}
              >
                Volver al menu
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Game;
