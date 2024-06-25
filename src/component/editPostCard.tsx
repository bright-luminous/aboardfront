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
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "@/app/public/itemContext";

export default function EditPostCard({ isActive, onShow }) {
  const { itemObj, setItemObj } = useContext(ItemContext);
  const [community, setCommunity] = useState("");
  const [title, editTitle] = useState(itemObj.title);
  const [content, editContent] = useState(itemObj.content);

  const handleCommunityChange = (event: SelectChangeEvent) => {
    setCommunity(event.target.value as string);
  };
  const handleTitleChange = (event: string) => {
    editTitle(event as string);
  };
  const handleContentChange = (event: string) => {
    editContent(event as string);
  };

  const [communityList, setCommunityList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/community`).then((response) => {
      if (response.data != null) {
        setCommunityList(response.data);
      }
    });
  }, [itemObj]);

  function wrapDeleteFunc(event) {
    console.log(itemObj);
    axios.put(
      `http://localhost:3000/post`,
      {
        id: itemObj.id,
        title: title,
        content: content,
        community: community,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    onShow();
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent sx={{ padding: 0, paddingTop: 1, paddingX: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          Edit Post
        </Typography>

        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel id="demo-simple-select-label">
            Choose a community
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={community}
            label="Choose a community"
            onChange={handleCommunityChange}
          >
            {communityList.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Title"
          id="fullWidth"
          defaultValue={itemObj.title}
          onChange={(e)=>handleTitleChange(e.currentTarget.value)}
          sx={{ marginY: 1 }}
        />

        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          label="What's on your mind..."
          defaultValue={itemObj.content}
          onChange={(e)=>handleContentChange(e.currentTarget.value)}
          sx={{ marginTop: 1 }}
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
          onClick={(e) => wrapDeleteFunc(e)}
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
