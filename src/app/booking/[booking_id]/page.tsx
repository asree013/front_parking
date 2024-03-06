'use client'
import React, { useEffect, useState } from 'react'
import './booking_id.css'
import { Button, Input, TextField } from '@mui/material'
import ParkLayout from '@/components/parks/ParkLayout'
import { Parks } from '@/interfaces/park.model'
import {searchByDate} from "@/services/booking.service"
import { Bookings } from '@/interfaces/booking.model'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRange, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs, { Dayjs } from 'dayjs'
import { NIL } from 'uuid'

interface ParamsBooking{
    params: {
        booking_id : string
    }
}

export default function page({params}: ParamsBooking) {
    const [value, setValue] = React.useState<DateRange<Dayjs>>([
        dayjs(new Date()),
        dayjs(new Date()),
      ]);
    const [park, setPark] = useState<Parks[]>([])
    const [statusEdit, setStatusEdit] = useState<boolean>(false)
    
    async function onSearchParkByDate() {

        const data = {} as Bookings
        data.start_date = String(value[0]) 
        data.end_date = String(value[1])
        const result = await searchByDate(data)
        if(result){
            setPark(result)
        }
    }
    useEffect(() => {
        if(params.booking_id !== NIL) {
            setStatusEdit(true)
        }
        else{
            setStatusEdit(false)
        }
    }, [])
    
  return (
    <div>
        <div className="from_create_booking">
            
            {
                statusEdit === false
                ? <><div className="menubar_create_booking">
                    <div className='action_create_booking'>
                        <h1>เลือกวันจอง</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                <DateRangePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        {/* <div className='inputP'>
                            <Input type='date' id='startDate' className=''
                            onChange={(e) => setSelectDate({...selectDate, start_date: e.target.value})}/>
                            <p>* วันที่เริมจอง</p>
                        </div>
                        <div className='inputP'>
                            <Input type='date' id='endDate' className=''
                            onChange={(e) => setSelectDate({...selectDate, end_date: e.target.value})} />
                            <p>* วันที้สิ้นสุดการจอง</p>
                        </div> */}
                            <Button type='button' variant="contained" onClick={onSearchParkByDate} className='btn_create'>ค้นหา</Button>
                        </div>
                    </div>
                    <div className="result_park">
                        <ParkLayout data={park} query={{start_date: value[0]? value[0].toISOString().split("T")[0]: '', end_date: value[1]? value[1].toISOString().split("T")[0]: ''}} />
                    </div>
                </>
                : <>
                    <div className="menubar_create_booking">
                    <div className='action_create_booking'>
                        <h1>แก้ไขวันจอง</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                <DateRangePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        {/* <div className='inputP'>
                            <Input type='date' id='startDate' className=''
                            onChange={(e) => setSelectDate({...selectDate, start_date: e.target.value})}/>
                            <p>* วันที่เริมจอง</p>
                        </div>
                        <div className='inputP'>
                            <Input type='date' id='endDate' className=''
                            onChange={(e) => setSelectDate({...selectDate, end_date: e.target.value})} />
                            <p>* วันที้สิ้นสุดการจอง</p>
                        </div> */}
                        <Button type='button' variant="contained"  className='btn_create'>แก้ไข</Button>
                        </div>
                    </div>
                </>
            }
            
        </div>
    </div>
  )
}
