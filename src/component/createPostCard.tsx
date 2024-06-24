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
import { getCookie } from "cookies-next";

export default function CreatePostCard({ isActive, onShow }) {
  var [selectedCommunity, setSelectedCommunity] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCommunity(event.target.value as string);
  };

  const [communityList, setCommunityList] = React.useState([]);
  React.useEffect(() => {
    axios.get(`http://localhost:3000/community`).then((response) => {
      if (response.data != null) {
        setCommunityList(response.data);
      }
    });
  }, []);

  const ownerDetail = getCookie("user")?.toString();
  var [title, setSelectedTitle] = React.useState("");
  var [content, setSelectedContent] = React.useState("");
  function setNewTitle(event) {
    setSelectedTitle(event.target.value as string);
  }
  function setNewContent(event) {
    setSelectedContent(event.target.value as string);
  }
  function createNewPost() {
    const ownerDetailJson = JSON.parse(ownerDetail!);
    axios
      .post(`http://localhost:3000/post`, {
        title: title,
        content: content,
        owner: ownerDetailJson.id,
        community: selectedCommunity,
      })
  }
  function wrapPostFunc(){
    createNewPost()
    onShow()
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent sx={{ padding: 0, paddingTop: 1, paddingX: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          Create Post
        </Typography>

        <FormControl fullWidth required sx={{ marginY: 1 }}>
          <InputLabel id="demo-simple-select-label">
            Choose a community
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCommunity}
            label="Choose a community"
            onChange={(e)=>handleChange(e)}
          >
            {communityList.map((item) => {
              return <MenuItem value={item.id}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Title"
          id="fullWidth"
          sx={{ marginY: 1 }}
          onChange={(e) => setNewTitle(e)}
        />

        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          label="What's on your mind..."
          sx={{ marginTop: 1 }}
          onChange={(e) => setNewContent(e)}
        />
      </CardContent>
      <CardActions className="flex" sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onShow}
          variant="outlined"
          sx={{
            color: "#49A569",
            borderColor: "#49A569",
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
            marginLeft: 1,
            height: 40,
            width: 100,
          }}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
}
