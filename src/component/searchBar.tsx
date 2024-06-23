import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: "70%",
        minWidth: 300,
        marginX: 2
      }}
    >
      <TextField fullWidth label="search" id="fullWidth" />
    </Box>
  );
}