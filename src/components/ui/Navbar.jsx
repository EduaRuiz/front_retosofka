import { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Grid,
  IconButton,
  Tabs,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Avatar
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Icono from "../../assets/img/JR.png";

function Navbar({ onDrawerToggle }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState({
    anchorUser: null,
    anchorSedes: null,
  });
  const {
    logout,
    player: { name },
  } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleMenu = (event, key) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [key]: event.currentTarget,
    }));
  };

  const handleClose = (key) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  };

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Tabs value={0} textColor="inherit">
              <Avatar alt="Remy Sharp" src={Icono} />
              </Tabs>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                id="basic-button"
                variant="contained"
                disableElevation
                onClick={() => navigate("/signup")}
              >
                NakamaTrivia (click aquí para ir al menu principal)
              </Button>
            </Grid>
            <Grid item xs />
            <Grid item>{name}</Grid>
            <div>
              <IconButton
                size="large"
                aria-label="Usuario actual"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleMenu(e, "anchorUser")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user"
                anchorEl={anchorEl.anchorUser}
                open={Boolean(anchorEl.anchorUser)}
                onClose={() => handleClose("anchorUser")}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

Navbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Navbar;
