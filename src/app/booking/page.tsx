'use client'
import React, { useEffect, useState } from 'react'
import TableBooking from './TableBooking'
import { Button, Fab, Input, TextField } from '@mui/material'
import './booking.css'
import { useRouter } from 'next/navigation'
import {NIL as nil} from 'uuid'
import { Bookings } from '@/interfaces/booking.model'
import {findAll} from '@/services/booking.service'
import Loadding from '@/components/load/Loadding'
import Accrodding from './Accrodding'
import AddIcon from '@mui/icons-material/Add';
import { SlipPayment } from '@/interfaces/slipPayment.model'

export default function page() {
  const router = useRouter()
  const [booking, setBooking] = useState<Bookings[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const b = {} as Bookings
  const [search, setSearch] = useState<Bookings[]>([b])

  async function feedBooking() {
    setLoad(true)
    const res = await findAll()
    if(res) {
      setBooking(res) 
      setLoad(false)
    } 
  }
  function getIdByTable(id: string) {
    const res = booking.filter(r => r.id !== id)
    setBooking(res)
  }
  async function onSearchBooking() {
    const res = booking.filter((r, i) => {
      
    })
  }
  useEffect(() => {
    feedBooking()
  }, [])
  return (
    <div>
        <h1>Booking</h1>
        <div className="menu_bar_booking">
          <TextField id="outlined-basic" label="Search" variant="outlined" onChange={onSearchBooking} />
          <Fab onClick={() => router.push(`/booking/${nil}`)} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
        <Accrodding data={booking} retutnId={getIdByTable} onReload={feedBooking} />
        <Loadding data={load} />
    </div>
  )
}
