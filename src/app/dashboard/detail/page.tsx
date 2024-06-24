"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PostList from "@/component/postList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentList from "@/component/commentList";
import CommentCreateBox from "@/component/commentCreateBox";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { navigate } from "@/component/action";

const PostDetail = () => {
  const [isOpen, setOpen] = useState(false);
  function toggle() {
    setOpen((isOpen) => !isOpen);
  }

  const router = useRouter()
  function backPage(){
    router.push("http://localhost:8080/dashboard")
  }

  return (
    <div className="place-content-center w-5/6 mx-20 pt-8">
      <IconButton
      onClick={backPage}
        edge="start"
        className="mx-6"
        sx={{ color: "#243831", backgroundColor: "#D8E9E4" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", margin: 1 }}>
        <Avatar
          alt="E"
          src="D:\test\aboardfront\src\picture\HC.jpg"
          sx={{ height: "60px", width: "60px", margin: 1 }}
        ></Avatar>
        <Typography sx={{ display: "inline", marginX: 1 }} variant="h6">
          DisplayName
        </Typography>
        <Typography sx={{ display: "inline" }} variant="subtitle2">
          12h ago
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} className="m-2">
        <Chip label="community" />
      </Stack>
      <div className="ml-3">
        <Typography variant="h3" color="text.primary" className="my-2">
          The Big Short War
        </Typography>
        <Typography
          sx={{ display: "inline", wordBreak: "break-word" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          "Tall, athletic, handsome with cerulean eyes, he was the kind of
          hyper-ambitious kid other kids loved to hate and just the type to make
          a big wager with no margin for error. But on the night before the
          S.A.T., his father took pity on him and canceled the bet. “I would’ve
          lost it,” Ackman concedes. He got a 780 on the verbal and a 750 on the
          math. “One wrong on the verbal, three wrong on the math,” he muses.
          “I’m still convinced some of the questions were wrong.”
        </Typography>
        <Typography variant="body2" color="text.secondary" className="my-5">
          32 comments
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
          <CommentCreateBox isActive={isOpen} onShow={() => toggle()} />
        )}
        <CommentList></CommentList>
      </div>
    </div>
  );
};

export default PostDetail;
