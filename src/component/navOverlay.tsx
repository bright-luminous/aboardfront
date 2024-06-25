"use client";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DoneIcon from "@mui/icons-material/Done";
import * as React from "react";
import Dashboard from "@/app/dashboard/page";
import { OurPostContext, UserLoginContext } from "@/app/public/itemContext";
import { useContext } from "react";
import { deleteCookie, getCookie } from "cookies-next";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userDetail = getCookie("user")?.toString();

  var { ourPostState, setOurPostState } = useContext(OurPostContext);
  const { userLoginState, setUserLoginState } = useContext(UserLoginContext);
  if (userDetail != undefined) {
    setUserLoginState(true);
  } else {
    setUserLoginState(false);
  }
  function toggleOwnerPost() {
    if (ourPostState == true) {
      setOurPostState(false);
    } else {
      setOurPostState(true);
    }
  }

  function prepUserDetail() {
    const ownerDetailJson = JSON.parse(userDetail!);
    return ownerDetailJson;
  }

  return (
    <Box sx={{ display: "flex" }} className="w-screen h-svh">
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#243831" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className=" text-white font-['Castoro'] italic " sx={{ flexGrow: 1 }}>
            a Board
          </Typography>
          {(userLoginState && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, paddingRight: 2 }}
              >
                {prepUserDetail().displayName}
              </Typography>

              <Avatar
                alt="E"
                // src="D:\test\aboardfront\src\picture\HC.jpg"
                sx={{ height: "40px", width: "40px", marginRight: 2 }}
              />

              <Button
                variant="contained"
                sx={{ bgcolor: "#49A569" }}
                href={`/login`}
                onClick={() => {
                  deleteCookie("user", { maxAge: 24 * 60 * 60 * 1000 });
                }}
              >
                Sing Out
              </Button>
            </Box>
          )) || (
            <Button
              variant="contained"
              sx={{ bgcolor: "#49A569" }}
              href={`/login`}
            >
              Sing In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="bg-[#BBC2C0]">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider className="bg-[#BBC2C0]" />
        <List className="bg-[#BBC2C0] h-dvh">
          <ListItem key={"Home"} disablePadding>
            <ListItemButton href={`/dashboard`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Our Blog"} disablePadding>
            <ListItemButton
              onClick={toggleOwnerPost}
              disabled={!userLoginState}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Our Blog"} />
              {ourPostState && <DoneIcon />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Dashboard ownerPost={ownerPost}/> */}
        {children}
      </Main>
    </Box>
  );
}
