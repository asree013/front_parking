'use client'
import { Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fab, Fade, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Users } from '@/interfaces/users.model'
import { findUserById, updateUserById } from '@/services/user.service'
import { toastAlert } from '@/services/alert.service'
import './user_id.css'
import { enviroment } from '@/constants/enviroment'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadForImage } from '@/services/upload.service'

interface ParamsInterface {
    params: {
        user_id: string
    }
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function page({params}: ParamsInterface) {
    const u = {} as Users
    const [user, setUser] = useState<Users>(u)
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState<string>('')
    const [file, setFile] = useState<File>()
    function handleOpen(){
        setOpen(true);
    }
    async function handleClose (){
        if(file){
            try {
                const upload = await uploadForImage(file)
                if(upload) {
                    const u = {} as Users
                    u.image_user = upload
                    const update = await updateUserById(params.user_id, u)
                    console.log('update: ', update);
                    setUser(update)
                    setOpen(false);
                }
            } catch (error) {
                console.log(error);
                toastAlert('upload Error', 'error')
            }
        }
    }

    async function feedProfile() {
        try {
            const result = await findUserById(params.user_id)
            setUser(result)
        } catch (error) {
            toastAlert(JSON.stringify(error), 'error')
        }
    }

    async function onUpdateUser() {
        const u = {} as Users 
        u.address = user.address
        u.bookings = user.bookings
        u.email = user.email
        u.firstname = user.firstname
        u.lastname = user.lastname
        u.idCard = user.idCard
        u.image_user = user.image_user
        u.phone = user.phone
        const result = await updateUserById(params.user_id, u)
        setUser(result)
        toastAlert('แก้ไขสำเร็จ', 'success')
    }

    useEffect(() => {
        feedProfile()
    }, [])
  return (
    <div>
        <div className='ProfileHomes'>
            <h1>Profile</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={user.image_user? enviroment.baseImage + user.image_user: enviroment.noImage}
                />
                <Typography gutterBottom variant="h6" component="div" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <p>อัพโหลดรูปภาพใหม่ </p>
                    <Fab color="primary" aria-label="add" style={{width: '2.2rem', height: '2.2rem'}} onClick={handleOpen}>
                        <AddPhotoAlternateIcon />
                    </Fab>
                </Typography>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    * ควรกรอกข้อมูชให้ครบท่วน
                    </Typography>
                    <p>Firstname</p>
                    <TextField
                        onChange={(e) => setUser({...user, firstname: e.target.value})}
                        value={user.firstname}
                        variant="filled"
                        size="small"
                    />
                    <p>Lastname</p>
                    <TextField
                        onChange={(e) => setUser({...user, lastname: e.target.value })}
                        value={user.lastname}
                        variant="filled"
                        size="small"
                    />
                    <p>Phone</p>
                    <TextField
                        onChange={(e) => setUser({...user, phone: e.target.value })}
                        value={user.phone}
                        variant="filled"
                        size="small"
                    />
                    <p>idCard</p>
                    <TextField
                        onChange={(e) => setUser({...user, idCard: e.target.value })}
                        value={user.idCard}
                        variant="filled"
                        size="small"
                    />
                    <p>Email</p>
                    <TextField
                        onChange={(e) => setUser({...user, email: e.target.value })}
                        value={user.email}
                        variant="filled"
                        size="small"
                    />
                    <p>Address</p>
                    <TextField
                        onChange={(e) => setUser({...user, address: e.target.value})}
                        id="standard-textarea"
                        value={user.address}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                </CardContent>
                <CardActions>
                    <Button variant='contained' type='button' onClick={onUpdateUser} color='primary' size="small">update</Button>
                </CardActions>
            </Card>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: 200 }}>
            <p>upload รูปภาพใหม่</p>
            {
                image?.length === 0
                ? <Card sx={{ maxWidth: 345 }}  variant='outlined' color='primary'>
                    <CardActionArea  onClick={(e)=> {
                    let upload = document.getElementById('uploadProfile')
                    upload?.click()
                    }}
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontSize: '3rem'}}>+</p>
                    </CardActionArea>
                </Card>
                : <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                    <p onClick={() => setImage('')} style={{marginLeft: '10px'}}>X</p>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt="green iguana"
                    />
                    </CardActionArea>
                </Card>
            }
            <input type="file" id='uploadProfile' onChange={(e) => {
                if(e.target.files && e.target.files[0]){
                    const file = URL.createObjectURL(e.target.files[0])
                    setImage(file)
                    setFile(e.target.files[0])
                }
            }} hidden />
            <Button style={{marginTop: 10, width: '100%'}} onClick={handleClose} variant='contained' color='success'>upload</Button>
            </Box>
        </Modal>
    </div>
  )
}
