"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useEffect } from "react";

export default function CommunitySelect({ selectedCommunity, handleChange }) {

  const [communityList, setCommunityList] = React.useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/community`).then((response) => {
      if (response.data != null) {
        setCommunityList(response.data)
      }
    });
  },[]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Community</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCommunity}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={""}>None</MenuItem>
          {communityList.map((item) => {
            return <MenuItem value={item.name}>{item.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
