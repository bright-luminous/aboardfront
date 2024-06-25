'use client'

import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import LoadImage from "@/app/public/aboard.png";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Login = () => {
  var currentUsername = "";
  function setNewUsername(username) {
    currentUsername = username;
  }

  const router = useRouter()

  function login(username) {
    axios
      .get(`http://localhost:3000/user/username?username=${username}`, {withCredentials: true})
      .then((response) => {
        if (response.data != "") {
          setCookie("user", response.data, { maxAge: 24 * 60 * 60 * 1000 });
          router.push("http://localhost:8080/dashboard")
        }
      });
  }
  return (
    <Box
      className="flex justify-center content-center w-full h-dvh"
      sx={{ backgroundColor: "#243831" }}
    >
      <Box className="grid justify-items-center  content-center w-2/3 h-dvh">
        <Typography
          variant="h6"
          className="justify-self-center ml-2 my-5 text-white w-2/3"
        >
          Sing In
        </Typography>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          onChange={(e)=>setNewUsername(e.currentTarget.value)}
          sx={{
            width: "66%",
            bgcolor: "#FFFFFF",
          }}
          />
        <Button
          variant="contained"
          onClick={()=>login(currentUsername)}
          sx={{
            width: "66%",
            bgcolor: "#49A569",
            marginY: 2,
          }}
        >
          Sing In
        </Button>
      </Box>
      <Box
        className="rounded-l-lg w-1/3 h-dvh grid justify-items-center content-center"
        sx={{ backgroundColor: "#2B5F44" }}
      >
        <Image
          src={LoadImage}
          width={300}
          height={300}
          alt="Picture of the author"
        />
        <Typography
          variant="h6"
          className="my-5 text-white font-['Castoro'] italic "
        >
          a Board
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
