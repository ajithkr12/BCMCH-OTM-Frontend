import React from 'react'
import { CircularProgress } from '@mui/material';

function Loader() {
  return (
    <div style={{position: 'relative'}}>
        <CircularProgress
            size={40}
            top={10}
            status={'loading'}
            style={{marginLeft: '50%'}} />
    </div>
  )
}

export default Loader