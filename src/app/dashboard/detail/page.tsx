'use client'

import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentList from "@/component/commentList";
import CommentCreateBox from "@/component/commentCreateBox";
import axios from "axios";
import { DetailPostContext, ItemContext } from "@/app/public/itemContext";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const PostDetail = () => {
  const {detailPost, setDetailPost} = useContext(DetailPostContext);

  const [isOpen, setOpen] = React.useState(false);
  var [initData, setInitData] = React.useState({
    "id": "26d347b6-1d71-444f-81da-f43f980962c1",
    "title": "TestPostTitle6 edit4",
    "content": "asdasssssssssssssssssssssssssssd",
    "createAt": "2024-06-24T14:22:31.535Z",
    "community": {
        "id": "2305da62-247e-4c16-940d-1e3f984d060c",
        "name": "Social",
        "createAt": "2024-06-23T12:29:21.838Z"
    },
    "owner": {
        "id": "dc613ad4-73ac-4b17-9c69-58d653dda58a",
        "username": "TestUsername2",
        "displayName": "TestDisplayName",
        "createAt": "2024-06-23T11:42:49.437Z"
    },
    "comments": []
});
  function toggle() {
    setOpen((isOpen) => !isOpen);
  }
  function getInitValue() {
    axios
      .get(`http://localhost:3000/post/id${window.location.search}`)
      .then((response) => {
        if (response.data != null) {
          setInitData(response.data);
        }
      });
  }

  useEffect(() => {
    getInitValue()
  }, [])

  return (
    <div className="place-content-center w-5/6 mx-20 pt-8">
      <IconButton
        href="http://localhost:8080/dashboard"
        edge="start"
        className="mx-6"
        sx={{ color: "#243831", backgroundColor: "#D8E9E4" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", margin: 1 }}>
        <Avatar
          alt="E"
          // src="D:\test\aboardfront\src\picture\HC.jpg"
          sx={{ height: "60px", width: "60px", margin: 1 }}
        ></Avatar>
        <Typography sx={{ display: "inline", marginX: 1 }} variant="h6">
          {initData.owner.displayName}
        </Typography>
        <Typography sx={{ display: "inline" }} variant="subtitle2">
          12h ago
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} className="m-2">
        <Chip label={initData.community.name} />
      </Stack>
      <div className="ml-3">
        <Typography variant="h3" color="text.primary" className="my-2">
          {initData.title}
        </Typography>
        <Typography
          sx={{ display: "inline", wordBreak: "break-word" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {" "}
          {initData.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="my-5">
          {initData.comments.length} comments
        </Typography>
        {!isOpen && (
          <Button
            onClick={toggle}
            variant="outlined"
            sx={{ color: "#49A569", borderColor: "#49A569" }}
          >
            Add Comment
          </Button>
        )}
        {isOpen && (
          <CommentCreateBox isActive={isOpen} onShow={() => toggle()} parentPostID={initData.id} />
        )}
        <CommentList initData={initData}></CommentList>
      </div>
    </div>
  );
};

export default PostDetail;
