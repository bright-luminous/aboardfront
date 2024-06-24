import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";

export default function CommentList() {
  const testarr = [
    {
      id: 1,
      displayname: "guy1",
      title: "title1",
      content: "asdasdasdasdasdasdasdasdasdasdasd",
      commentCount: 12,
    },
    {
      id: 2,
      displayname: "guy2",
      title: "title2",
      content: "zxczxczxczxczxczxczxczxczxc",
      commentCount: 21,
    },
  ];
  return (
    <List sx={{ width: "90%", minWidth: 360, bgcolor: "background.paper" }}>
      {testarr.map((item) => (
        <>
          <ListItem alignItems="flex-start" className="ml-15">
            <ListItemAvatar>
              <Avatar
                alt="E"
                src="D:\test\aboardfront\src\picture\HC.jpg"
                sx={{ height: "40px", width: "40px", margin: 1 }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Box sx={{display:'flex', alignItems: 'center'}}>
              <Typography variant="h6" color="text.primary">
                {item.title}
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
