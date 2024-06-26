import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Backdrop,
  Box,
  Chip,
  IconButton,
  ListItemButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createContext, useContext, useEffect, useState } from "react";
import EditPostCard from "./editPostCard";
import DeletePostCard from "./deletePostCard";
import { useRouter } from "next/navigation";
import { DetailPostContext, ItemContext, OurPostContext, UserLoginContext } from "@/app/public/itemContext";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function PostList({ currentPostList }) {
  const {userLoginState, setUserLoginState} = useContext(UserLoginContext);

  const ownerDetail = getCookie("user")?.toString();
  const {detailPost, setDetailPost} = useContext(DetailPostContext);

  const [itemObj, setItemObj] = useState("");
  const value = { itemObj: itemObj, setItemObj: setItemObj };

  const [editIsOpen, editSetOpen] = useState(false);
  function editToggle(event) {
    editSetOpen((editIsOpen) => !editIsOpen);
    if (event !== undefined) {
      axios
        .get(`http://localhost:3000/post/id?id=${event.currentTarget.id}`)
        .then((response) => {
          if (response.data != null) {
            setItemObj(response.data);
          }
        });
      setItemObj(event.currentTarget);
    }
  }

  const [deleteIsOpen, deleteSetOpen] = useState(false);
  function deleteToggle(event) {
    deleteSetOpen((deleteIsOpen) => !deleteIsOpen);
    if (event !== undefined) {
      setItemObj(event.currentTarget);
    }
  }

  const router = useRouter();
  function detailPage(event) {
    setDetailPost(itemObj)
    setItemObj(event.currentTarget);
    router.push(`http://localhost:8080/dashboard/detail?id=${event.currentTarget.id}`);
  }

  return (
    <List
      sx={{
        width: "90%",
        minWidth: 360,
        bgcolor: "background.paper",
        borderRadius: 4,
      }}
    >
      {currentPostList.map((item) => {
        return (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <ListItem sx={{ width: 1, display: "block" }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="E"
                        // src="D:\test\aboardfront\src\picture\HC.jpg"
                        sx={{ height: "50px", width: "50px", margin: 1 }}
                      />
                    </ListItemAvatar>
                    <Typography>{item.owner.displayName}</Typography>
                  </Box>
                </Box>
                <ListItemText sx={{ paddingLeft: 1, width: 1 }}>
                  <ListItemButton
                  id={item.id}
                    onClick={(e) => detailPage(e)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "left",
                      width: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ paddingBottom: 1 }}
                    >
                      <Chip label={item.community.name} />
                    </Stack>
                    <Typography variant="h4" color="text.primary">
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                      }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >
                      {item.content}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {item.comments.length} comments
                    </Typography>
                  </ListItemButton>
                </ListItemText>
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <Box>
                    <IconButton
                      id={item.id}
                      aria-label="delete"
                      onClick={(e) => editToggle(e)}
                      disabled={!userLoginState}
                    >
                      <EditIcon sx={{ margin: 1 }} />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      id={item.id}
                      aria-label="add an alarm"
                      onClick={(e) => deleteToggle(e)}
                      disabled={!userLoginState}
                    >
                      <DeleteIcon sx={{ margin: 1 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </ListItem>
            <Divider variant="middle" component="li" />
          </Box>
        );
      })}
      <ItemContext.Provider value={value}>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={editIsOpen}
        >
          {editIsOpen && (
            <EditPostCard
              isActive={editIsOpen}
              onShow={(e) => editToggle(e)}
            ></EditPostCard>
          )}
        </Backdrop>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={deleteIsOpen}
        >
          {deleteIsOpen && (
            <DeletePostCard onShow={(e) => deleteToggle(e)}></DeletePostCard>
          )}
        </Backdrop>
      </ItemContext.Provider>
    </List>
  );
}
