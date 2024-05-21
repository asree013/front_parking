import { Box, LinearProgress } from '@mui/material'
import React from 'react'

export default function Loadding() {

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '70%' }}>
        <LinearProgress color='info' />
      </Box>
    </div>
  )
}
