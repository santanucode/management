import React from "react";
import { useNavigate } from "react-router-dom";
import "../style.scss";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { RiNotification2Line } from "react-icons/ri";
// import { Notification } from 'iconsax-react';
import ControlledOpenSelect from "components/common/Lang/LanguageDrop";
import { HambergerMenu } from "iconsax-react";

const Header = ({ handleToggleSidebar }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const navigate = useNavigate();
  const LogoutPass = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const accountPage = () => {
    navigate("/account");
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ top: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={accountPage}>My account</MenuItem>
      <MenuItem onClick={LogoutPass}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <RiNotification2Line />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            {...stringAvatar("Santanu Rout")}
            sx={{
              width: "30px",
              height: "30px",
              fontSize: "14px",
              bgcolor: "#499f83",
            }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")}`.charAt(0),
      // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <>
      <div className="headerToggole">
        <IconButton
          aria-label="open drawer"
          sx={{ mr: 2, padding: 0 }}
          onClick={() => handleToggleSidebar(true)}
          className="btn-toggle onmobileScreen"
        >
          <HambergerMenu size="32" color="#484848" variant="Bold" />
        </IconButton>
      </div>
      <div className="header-container w-100 d-flex justify-content-end p-0">
        <Toolbar>
          {/* <ControlledOpenSelect /> */}

          {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notification size="20" color={"grey"} variant="Bold" />
          </Badge>
        </IconButton> */}
          <IconButton
            size="medium"
            // edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            // aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              {...stringAvatar("Manas Baral")}
              sx={{
                width: "30px",
                height: "30px",
                fontSize: "14px",
                bgcolor: "#499f83",
              }}
            />
          </IconButton>

          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <CgDetailsMore />
          </IconButton>
        </Box> */}
        </Toolbar>
        {/* </AppBar> */}
        {renderMobileMenu}
        {renderMenu}
        {/* </Box> */}
      </div>
    </>
  );
};

export default Header;
