import React from 'react'
import { Box, Stack,Typography } from '@mui/material';

const Dots = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Box
        sx={{
            width:  12,
            height:  12,
            borderRadius: '50%',
            bgcolor: 'red'
        }}
      >
      </Box>
    </Stack>
  )
}

export default Dots