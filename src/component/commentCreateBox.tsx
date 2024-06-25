import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { UserLoginContext } from "@/app/public/itemContext";
import { useContext } from "react";

export default function CommentCreateBox({ isActive, onShow, parentPostID }) {
  const {userLoginState, setUserLoginState} = useContext(UserLoginContext);
  const ownerDetail = getCookie("user")?.toString();

  var [textboxValue, setTextboxValue] = React.useState("")
  function createNewComment(){
    const ownerDetailJson = JSON.parse(ownerDetail!);
    axios
      .post(`http://localhost:3000/comment`, {
        content: textboxValue,
        owner: ownerDetailJson.id,
        parentPost: parentPostID,
      })
  }
  function setTextbox(event) {
    setTextboxValue(event.target.value as string);
  }
  function wrapPostFunc(){
    createNewComment()
    onShow()
  }

  return (
    <Box
      component="form"
      className=" my-2 w-full"
      noValidate
      autoComplete="off"
    >
      {isActive && (
        <TextField
          id="outlined-multiline-static"
          label="What's on your mind..."
          multiline
          rows={4}
          fullWidth
          onChange={(e) => setTextbox(e)}
        />
      )}
      {isActive && (
        <Box className="flex" sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={onShow}
            variant="outlined"
            sx={{
              color: "#49A569",
              borderColor: "#49A569",
              marginTop: 1,
              marginLeft: 1,
              height: 40,
              width: 100,
            }}
          >
            Cancel
          </Button>
          <Button
          onClick={wrapPostFunc}
            variant="contained"
            sx={{
              bgcolor: "#49A569",
              borderColor: "#49A569",
              marginTop: 1,
              marginLeft: 1,
              height: 40,
              width: 100,
            }}
            disabled={!userLoginState}
          >
            Post
          </Button>
        </Box>
      )}
    </Box>
  );
}
