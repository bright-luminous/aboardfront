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

export default function EditPostCard({ isActive, onShow }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const testArr = ["History", "Social"];

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent sx={{padding:0, paddingTop:1, paddingX:1}}>
        <Typography gutterBottom variant="h5" component="div">
          Edit Post
        </Typography>

        <FormControl fullWidth sx={{marginY:1}}>
          <InputLabel id="demo-simple-select-label">
            Choose a community
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Choose a community"
            onChange={handleChange}
          >
            {testArr.map((item) => (
              <MenuItem value={item} key={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField fullWidth label="Title" id="fullWidth" sx={{marginY:1}}/>

        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          label="What's on your mind..."
          sx={{marginTop:1}}
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
