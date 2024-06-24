import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

export default function CommentCreateBox({ isActive, onShow }) {
  return (
    <Box
      component="form"
      className=" my-2 w-full"
      noValidate
      autoComplete="off"
    >
      {isActive && (
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          fullWidth
        />
      )}
      {isActive && (
        <Box className="flex" sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={onShow}
            variant="outlined"
            sx={{
              color: "#49A569",
              borderColor: "#49A569",
              marginTop: 1,
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
              marginTop: 1,
              marginLeft: 1,
              height: 40,
              width: 100,
            }}
          >
            Post
          </Button>
        </Box>
      )}
    </Box>
  );
}
