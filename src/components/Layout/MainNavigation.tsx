import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/svg";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const pages = [
  { url: "/", label: "Home" },
  { url: "/stats", label: "Stats" },
  { url: "/create", label: "New" },
];
const settings = [
  { url: "/profile", label: "Profile" },
  { url: "/logout", label: "Logout" },
];
const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page?: string) => {
    setAnchorElNav(null);
    if (page && page !== "/logout") {
      navigate(`${process.env.PUBLIC_URL}${page}`);
    }
    if (page === "/logout") {
      dispatch(authActions.logout());
    }
  };

  const handleCloseUserMenu = (page?: string) => {
    setAnchorElUser(null);
    if (page && page !== "/logout") {
      navigate(`${process.env.PUBLIC_URL}${page}`);
    }
    if (page === "/logout") {
      dispatch(authActions.logout());
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            className={classes.logoLink}
            component="div"
            onClick={() => navigate(`${process.env.PUBLIC_URL}`)}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Logo />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {isLoggedIn && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.url)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            className={classes.logoLink}
            onClick={() => navigate(`${process.env.PUBLIC_URL}`)}
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Logo />
          </Typography>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.url)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn && (
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  className={classes.profileLink}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => handleCloseUserMenu(setting.url)}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavigation;
