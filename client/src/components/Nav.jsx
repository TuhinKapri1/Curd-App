import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import {
  Avatar,
  Container,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/profileSlice";
function Nav() {
  const dispatch=useDispatch()
  const { token } = useSelector((state) => state.profile);
  const pages = [{ name: "Home", path: "/" }];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" className="bg-white ">
      <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Stack
            direction="row"
            sx={{ width: 1 / 1 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "gray",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Link key={index} to={page?.path}>
                  <Typography sx={{ color: "gray" }}>{page?.name}</Typography>
                </Link>
              ))}
            </Box>

            {token ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" ,padding:4}}
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
                  onClose={handleCloseUserMenu}
                >

                <Typography sx={{paddingX:4}} variant="contained" onClick={()=>{
                  dispatch(logout())
                }} >
                  Logout
                </Typography>
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" sx={{ color: "gray" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))} */}
                </Menu>
              </Box>
            ) : (
              <Stack direction="row" sx={{}}>
                <Link to="/sign-in">
                  <Typography
                    variant="outlined"
                    sx={{
                      marginLeft: 5,
                      paddingY: 1,
                      paddingX: 2,
                      border: "1px solid blue",
                      color: "blue",
                      borderRadius: 1,
                    }}
                  >
                    SignIn
                  </Typography>
                </Link>
                <Link to="/sign-up">
                  <Typography
                    variant="outlined"
                    sx={{
                      marginLeft: 5,
                      paddingY: 1,
                      paddingX: 2,
                      border: "1px solid blue",
                      color: "blue",
                      borderRadius: 1,
                    }}
                  >
                    SignUp
                  </Typography>
                </Link>
              </Stack>
            )}
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page?.path}>{page?.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
