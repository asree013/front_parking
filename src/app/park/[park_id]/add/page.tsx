'use client'
import React, { ChangeEvent, useState } from 'react'
import './add.css'
import { Button, Card, CardActionArea, CardMedia, TextField } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Bookings } from '@/interfaces/booking.model'
import { Payments } from '@/interfaces/payment.model'
import {validJwt} from '@/services/authen.service'
import { toastAlert } from '@/services/alert.service'
import {createBooking} from '@/services/booking.service'
import { createPayment } from '@/services/payment.service'
import { SlipPayment } from '@/interfaces/slipPayment.model'
import { uploadForImage } from '@/services/upload.service'
import { createSlipPayment } from '@/services/slipPayment.service'

export default function page() {
  const router = useRouter()
  const start_date = useSearchParams().get('start')
  const end_date = useSearchParams().get('end')
  const park_id = useParams()
  const b= {} as Bookings
  const [booking, setBooking] = useState<Bookings>(b)
  const p = {} as Payments
  const [payment, setPayment] = useState<Payments>(p)
  const [arrImg, setArrImg] = useState<string[]>([])
  const [image, setImage] = useState<string>('')
  const [slipImage, setSlipImage] = useState<string>('')
  
  async function onCreateBooking() {
    const authen = localStorage.getItem('authen')
    if(!authen) {
      router.push('/login')
    }
    else{
      try {
        const jwt = JSON.parse(authen).jwt
        
        const resJwt = await validJwt(jwt.toString())
        console.log(resJwt.id);

        const book = {} as Bookings
        book.detail = booking.detail
        book.booking_by = booking.booking_by
        book.start_date = start_date? start_date: ''
        book.end_date = end_date? end_date: ''
        book.parking_id = String(park_id.park_id)
        book.created_by = resJwt.id.toString()

        

        const resBook = await createBooking(book)
        
        if(resBook) {
          const pm = {} as Payments
          pm.count = payment.count
          pm.deposit = payment.deposit
          pm.remian = 0
          pm.booking_id = resBook.id
          
          const resPayment = await createPayment(pm)
          if(slipImage) {
            const slip = {} as SlipPayment
            slip.image = slipImage
            slip.detail = 'ค่ามัดจำ'
            slip.payment_id = resPayment.id
            slip.count = resPayment.count
            const resSlip = await createSlipPayment(slip)
          }
          router.push('/booking')
        }
        
        
      } catch (error: any) {
        console.log(error)
        toastAlert(JSON.stringify(error.message), 'error')
      }
    }
  }
  return (
    <div className='add_home'>
      <h1>กรอกรายละเอียดการจอง</h1>
      <form action="" style={{width: '100%'}}>
        <div className="inputForms">
          <TextField required onChange={(e) => setBooking({...booking, detail: e.target.value})} label="รายละเอียดการจอง" variant="filled" />
          <p>* กรอกรายละเอียดทั่วไป</p>
        </div>
        <div className="inputForms">
          <TextField required onChange={(e) => setBooking({...booking, booking_by: e.target.value})} label="ผู้จอง" variant="filled" />
          <p>* กรองชื่อผู้ที่ต้องการจอง</p>
        </div>
        <div className="inputForms">
          <TextField type='number' onChange={(e) => setPayment({...payment, deposit: Number(e.target.value)})} label="มัดจำ" variant="filled" />
          <p>* กรองมัดจำในการจองครั้งนี้</p>
        </div>
        <div className="inputForms">
          <TextField type='number' onChange={(e) => setPayment({...payment, count: Number(e.target.value)})} label="ราคา" variant="filled" />
          <p>* กรองราคาในการจองครั้งนี้</p>
        </div>
        <div className="inputForms">
          <p>upload สลิปมัดจำ</p>
          {
            image?.length === 0
            ? <Card sx={{ maxWidth: 345 }}  variant='outlined' color='primary'>
                <CardActionArea  onClick={(e)=> {
                  let upload = document.getElementById('uploadDeposit')
                  upload?.click()
                }}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <p style={{fontSize: '3rem'}}>+</p>
                </CardActionArea>
              </Card>
            : <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
          }
          <input id='uploadDeposit' type='file' hidden onChange={async (e: ChangeEvent<HTMLInputElement>) =>  {
            if(e.target.files && e.target.files[0]){
              try {
                const files = URL.createObjectURL(e.target.files[0])
                const upload = await uploadForImage(e.target.files[0])
                if(upload){
                  setImage(files)
                  setSlipImage(upload)
                }
              } catch (error) {
                console.log(error);               
                toastAlert(JSON.stringify(error), 'error')
              }
            }
          }} />
          <p>* สลิปมัดจำในการจองครั้งนี้</p>
        </div>
        <Button type='submit' onClick={(e) => {
          e.preventDefault()
          onCreateBooking()
        }} variant='contained'>จอง</Button>
      </form>
    </div>
  )
}
