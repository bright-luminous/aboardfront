import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";
import axios from "axios";
// /comment/post?id=d00b41f5-373f-4fde-8d17-450825acdf3f

export default function CommentList({initData}) {
  var [commentList, setCommentList] = React.useState([])
  function getCommentList() {
    axios
      .get(`http://localhost:3000/comment/post?id=${initData.id}`)
      .then((response) => {
        if (response.data != null) {
          setCommentList(response.data);
        }
      });
  }

  React.useEffect(() => {
    getCommentList()
  })
  return (
    <List sx={{ width: "90%", minWidth: 360, bgcolor: "background.paper" }}>
      {commentList.map((item) => (
        <>
          <ListItem alignItems="flex-start" className="ml-15">
            <ListItemAvatar>
              <Avatar
                alt="E"
                // src="D:\test\aboardfront\src\picture\HC.jpg"
                sx={{ height: "40px", width: "40px", margin: 1 }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Box sx={{display:'flex', alignItems: 'center'}}>
              <Typography variant="h6" color="text.primary">
                {item.owner.displayName}
              </Typography>
                <Typography sx={{ display: "inline", marginLeft:1 }} variant="subtitle2">
                  12h ago
                </Typography>
              </Box>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.content}
              </Typography>
            </ListItemText>
          </ListItem>
        </>
      ))}
    </List>
  );
}
