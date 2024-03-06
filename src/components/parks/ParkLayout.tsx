'use client'
import React from 'react'
import CardPark from '../card/CardPark'
import { Box, Button, Card, CardActions, CardContent, Input, Typography } from '@mui/material'
import Link from 'next/link'
import { Parks } from '@/interfaces/park.model'
import {NIL as nil } from  'uuid'
import './parkLayout.css'
import { useRouter } from 'next/navigation'

interface IPark {
    data: Parks[]
    query: {start_date: string, end_date: string}
}

export default function ParkLayout({data, query}: IPark) {
  if(!query){
    query =  {
      start_date: '',
      end_date: ''
    }
  }
  const router = useRouter()
  return (
    <div>
      <div className="body_Home">
        {
          data.length > 0
          ? data.map((r, i) => 
              <div key={r.id} style={{textDecoration: 'none'}}>
                <CardPark  data={r} query={query}/>
              </div>
            )
          : <div onClick={() => router.push('/park/'+nil)} style={{cursor: 'pointer'}} >
              <Card sx={{ minWidth: 275 }} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',textDecoration: 'none'}}>
                <CardContent style={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                  <Typography variant="h5" component="div">
                    ไม่มีห้อง
                  </Typography>
                  <Typography color="text.secondary">
                    <p style={{fontSize: '3rem'}}>+</p>
                  </Typography>
                  <Typography color="text.secondary">
                    คลิกเพื้อสร้าง
                  </Typography>
                </CardContent>
              </Card>
            </div>
        }
      </div>
    </div>
  )
}
