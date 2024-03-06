import { Backdrop, CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

interface retutnType {
  data: boolean
}

export default function Loadding({data}: retutnType) {

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={data}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
        <LinearProgress />
    </Backdrop>
  )
}
