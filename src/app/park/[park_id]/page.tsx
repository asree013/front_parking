'use client'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FormControl, FormLabel, FormHelperText, TextField, Card, CardActionArea, CardMedia, CardContent, Switch } from '@mui/material';
import './park_id.css'
import { Parks } from '@/interfaces/park.model';
import { create, deleteParkById, updateParkById, findParkById } from "@/services/park.service"
import { useRouter } from 'next/navigation';
import { NIL as nil } from 'uuid';
import axios from 'axios';
import { enviroment } from '@/constants/enviroment';
import Swal from 'sweetalert2';
import { toastAlert } from '@/services/alert.service';


export default function page({ params }: { params: { park_id: string } }) {
  const router = useRouter()
  const [park, setPark] = useState<Parks>({
    active: false,
    create_date: '',
    id: '',
    image_park: '',
    name_park: '',
    update_date: '',
  })
  const [image, setImage] = useState<string>('')

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0])
      const data = {
        file: e.target.files[0]
      }
      try {
        const result = await axios.post(`${enviroment.baseUrl}${enviroment.upload}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (result.data) {
          setPark({ ...park, image_park: result.data })
          setImage(file)
        }
      } catch (error) {
        console.log(error);

      }
    }
  }
  async function createParks() {
    try {
      const addPark = {} as Parks
      addPark.name_park = park.name_park
      addPark.image_park = park.image_park
      addPark.active = park.active
      console.log(park);
      const result = await create(addPark)
      console.log(result);
      router.back()

    } catch (error) {
      console.log(error);

    }
  }
  async function feedPark() {
    const result = await findParkById(params.park_id)
    console.log(result);

    setPark(result)

  }

  async function onClickEditPark() {
    const p = {} as Parks
    p.image_park = image.length === 0 ? park.image_park : image
    p.name_park = park.name_park
    p.active = park.active
    const update = await updateParkById(params.park_id, p)
    setPark(update)
    toastAlert('บันทึกการแก้ไข', 'success')
  }

  async function onClickDeletePark() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleted = await deleteParkById(params.park_id)
        if (deleted) {
          toastAlert('deleted Success', 'success')
          router.back()
        }
      }
    });

  }

  React.useState(() => {
    if (params.park_id !== nil) {
      feedPark()
    }
  })
  return (
    <div className='body_create_park'>
      <h1>Create Parks</h1>
      <form className="from_create_park">
        <FormControl className='FormControl'>
          <FormLabel>ชื่อโรงจอดรถ</FormLabel>
          <TextField variant='filled' placeholder="โรงจอง 111"
            value={park.name_park} onChange={(e) => setPark({ ...park, name_park: e.target.value })} />
          <FormHelperText>This is a helper text.</FormHelperText>
        </FormControl>
        <FormControl className='FormControl'>
          <FormLabel>image_park</FormLabel>
          <input type='file' id='parkUploadImage'
            onChange={uploadImage} hidden
          />
          <FormHelperText>This is a helper text.</FormHelperText>
          {
            image.length === 0 && park.image_park?.length === 0
              ? <div>
                <div onClick={() => document.getElementById('parkUploadImage')?.click()}>
                  <Card sx={{ minWidth: 275 }} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontSize: '3em' }}>+</p>
                    </CardContent>
                  </Card>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p>เปิดให้ใช้งาน: </p>
                  <Switch value={park.active} onChange={(e) => setPark({ ...park, active: e.target.checked })} checked={park.active} />
                </div>
              </div>

              : <div>
                <Card sx={{ maxWidth: 345 }}>
                  <p style={{ fontSize: '2rem', margin: '0 20px' }} onClick={() => {
                    setImage('')
                    setPark({ ...park, image_park: '' })
                  }}>X</p>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={image ? image : enviroment.baseImage + park.image_park}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p>เปิดให้ใช้งาน: </p>
                  <Switch value={park.active} onChange={(e) => setPark({ ...park, active: e.target.checked })} checked={park.active} />
                </div>
              </div>
          }
        </FormControl>
        {
          params.park_id === nil
            ? <Button style={{ width: '95%' }} type='submit' variant='contained' onClick={(e) => { e.preventDefault(); createParks() }}>เพิ่มที่จอดรถ</Button>
            : <div>
              <Button style={{ width: '95%' }} type='submit' variant='contained' onClick={(e) => { e.preventDefault(); onClickEditPark() }}>บันทึกการแก้ไข</Button>
              <Button style={{ width: '95%', marginTop: '5px' }} type='submit' variant='contained' color='error' onClick={(e) => { e.preventDefault(); onClickDeletePark() }}>ลบที่จอดรถนี้</Button>
            </div>
        }
      </form>
    </div>
  )
}
