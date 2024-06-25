import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { title } from "process";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "@/app/public/itemContext";

export default function DeletePostCard({ onShow }) {
  const {itemObj, setItemObj} = useContext(ItemContext);

  function deletePost(postID: String) {
    axios.delete(`http://localhost:3000/post?id=${postID}`);
  }

  function wrapDeleteFunc(event) {
    console.log(itemObj)
    deletePost(event.target.id);
    onShow();
  }
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
      <CardContent sx={{ padding: 0, paddingTop: 1, paddingX: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{ color: "#101828" }}
        >
          Please confirm if you wish to delete the post
        </Typography>

        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          align="center"
          sx={{ color: "#475467" }}
        >
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </Typography>
      </CardContent>
      <CardActions className="flex" sx={{ justifyContent: "center" }}>
        <Button
          onClick={onShow}
          variant="outlined"
          sx={{
            color: "#939494",
            borderColor: "#939494",
            marginLeft: 1,
            height: 40,
            width: 100,
          }}
        >
          Cancel
        </Button>
        <Button
          id={itemObj.id}
          onClick={(e) => wrapDeleteFunc(e)}
          variant="contained"
          sx={{
            bgcolor: "red",
            color: "#FFFFFF",
            marginLeft: 1,
            height: 40,
            width: 100,
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
