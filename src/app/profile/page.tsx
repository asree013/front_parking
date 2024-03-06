'use client'
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './profile.css'
import { Users } from '@/interfaces/users.model'
import { enviroment } from '@/constants/enviroment'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { findUserAll } from '@/services/user.service'

export default function page() {
    const u = {} as Users
    const [profile, setProfile] = useState<Users[]>([u])
    
    async function feedProfileAll () {
        const result = await findUserAll()
        console.log(result);
        
        if(result) {
            setProfile(result)
        }
    }
    useEffect(() => {
        feedProfileAll()
    }, [])
  return (
    <div className='ProfileHomes'>
        <h1>Profile</h1>
        {profile.map((r, i) => 
            <Card sx={{ display: 'flex' }} className='profile_home'>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={r.image_user? enviroment.baseImage + r.image_user: enviroment.noImage}
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        name: {r.firstname} {r.lastname}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        email: {r.email? r.email: 'ยังไม่เพิ่มข้อมูล'}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        tel: {r.phone? r.phone: 'ยังไม่เพิ่มข้อมูล'}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        address: {r.address? r.address: 'ยังไม่เพิ่มข้อมูล'}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        role: {r.role}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        create_data: {r.create_date? r.create_date.split('T')[0]: ''}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        update_data: {r.create_date? r.update_date.split('T')[0]: ''}
                    </Typography>
                    </CardContent>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                    </Box> */}
                </Box>
            </Card>
        )}

    </div>
  )
}
