import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Bookings } from '@/interfaces/booking.model';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Fab, ListItem, Modal, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Swal from 'sweetalert2';
import { toastAlert } from '@/services/alert.service';
import { deleteById } from '@/services/booking.service';
import { createSlipPayment, deleteByIdSlip } from '@/services/slipPayment.service';
import { deleteByIdPayment } from '@/services/payment.service';

import { enviroment } from '@/constants/enviroment';
import CardBooking from '@/components/card/CardBooking';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextField from '@mui/material/TextField';
import { uploadForImage } from '@/services/upload.service';
import { SlipPayment } from '@/interfaces/slipPayment.model';
import { useRouter } from 'next/navigation';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';


interface returnTpye {
    data: Bookings[]
    retutnId: (id: string) => void
    onReload: () => void
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

export default function Accrodding({ data, retutnId, onReload }: returnTpye) {
    const router = useRouter()
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [open, setOpen] = React.useState(false);
    const [newSlip, setNewSlip] = React.useState<string>('')
    const [image, setImage] = React.useState<File>()
    const [slip, setSlip] = React.useState<SlipPayment>({
        create_date: '',
        detail: '',
        id: '',
        image: '',
        payment_id: '',
        update_date: '',
        count: 0
    })


    const handleOpen = (id: string) => {
        setOpen(true);
        setSlip({ ...slip, payment_id: id })
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    function Ondelete(b: Bookings) {
        Swal.fire({
            title: "Are you sure?",
            text: "ต้องการลบประวัติการจองนี้หรือไม่",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ลบเลย",
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (b.payments?.slipPayment) {
                        b.payments.slipPayment.map(async (r, i) => {
                            return await deleteByIdSlip(r.id)
                        })

                    }
                    if (b.payments?.id) {
                        await deleteByIdPayment(b.payments?.id)
                    };
                    await deleteById(b.id)
                    retutnId(b.id)
                    toastAlert('deleted!!!', 'success')
                } catch (error) {
                    console.log(error);
                    toastAlert('deleted error', 'error')
                }
            }
        });
    }
    async function handleUpload() {
        try {
            if (image) {
                if (slip.count === 0 || slip.detail.length === 0) {
                    return toastAlert('กรุณากรอกข้อมูลให้ครบ', 'error')
                }
                const result = await uploadForImage(image)
                const sl = {} as SlipPayment
                sl.image = result
                sl.payment_id = slip.payment_id
                sl.detail = slip.detail
                sl.count = slip.count
                const resSlip = await createSlipPayment(sl)
                if (resSlip) {
                    setOpen(false)
                    onReload()
                }
            }
        } catch (error) {
            console.log(error)
            toastAlert(JSON.stringify(error), 'error')
        }
    }

    return (
        <div>
            {
                data.length > 0 ?
                    data.map((r, i) =>
                        <div key={r.id}>
                            <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin: '5px' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>
                                                <CardMedia
                                                    component="img"
                                                    alt="green iguana"
                                                    height="60"
                                                    image={enviroment.baseImage + r.parkings.image_park}
                                                />
                                            </Typography>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>ชื่อ: {r.parkings.name_park}</Typography>
                                            {/* <Typography style={{margin: '5px'}} sx={{ color: 'text.secondary' }}>สถาณะ: {r.payments?.slipPayment === 'complete'? <div>{TaskAltIcon}</div>: HourglassTopIcon}</Typography> */}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>
                                                สถานะ: {r.status}
                                            </Typography>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>ผู้จอง: {r.booking_by}</Typography>
                                            {/* <Typography style={{margin: '5px'}} sx={{ color: 'text.secondary' }}>สถาณะ: {r.payments?.slipPayment === 'complete'? <div>{TaskAltIcon}</div>: HourglassTopIcon}</Typography> */}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>เริ่ม: {r.start_date.split('T')[0]}</Typography>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>สิ้นสุด: {r.end_date.split('T')[0]}</Typography>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <Typography style={{ margin: '5px' }} sx={{ color: 'text.secondary' }}>แก้ไขวันจอง:</Typography>
                                            <Fab onClick={() => router.push(`/booking/${r.id}`)} color="warning" aria-label="add" style={{ width: '2.5rem', height: '2.5rem' }}>
                                                <EditCalendarIcon />
                                            </Fab>
                                        </div>
                                    </div>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <h3>Detail</h3>
                                        <p>รายละเอียด: {r.detail}</p>
                                        <p>มัดจำ: {r.payments?.deposit}</p>
                                        <p>ราคาเต็ม: {r.payments?.count}</p>
                                        <p>ชำระแล้ว: {r.payments?.remian} หลืออีก: {r.payments?.count || r.payments?.remian ? (r.payments?.count - r.payments?.remian) : 0}</p>
                                    </Typography>
                                    <Typography>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <h3>image</h3>
                                            <Fab onClick={() => handleOpen(r.payments ? r.payments.id : '')} color="success" aria-label="add" style={{ width: '2.2rem', height: '2.2rem' }}>
                                                <AddPhotoAlternateIcon />
                                            </Fab>
                                        </div>
                                        {r.payments?.slipPayment.map(r =>
                                            <CardBooking data={r} onReload={onReload} />
                                        )}
                                    </Typography>
                                    <Typography margin={'10px'}>
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                label="edit"
                                                deleteIcon={<AutoAwesomeMosaicIcon />}
                                                variant="filled"
                                                color='primary'
                                            />
                                            <Chip
                                                label="delete"
                                                deleteIcon={<DeleteIcon />}
                                                variant="filled"
                                                color='error'
                                                onDelete={() => Ondelete(r)}
                                            />
                                        </Stack>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ) :
                    <p>ไม่มีข้อมู</p>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} >
                    {
                        newSlip.length === 0
                            ? <div onClick={(e) => {
                                document.getElementById('uploadNewSlip')?.click()
                            }}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                        <p>คลิกเพื่อัพโหลดสลิป</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                        <p style={{ fontSize: '3rem' }}>+</p>
                                    </div>
                                </Card>
                            </div>
                            : <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={newSlip}
                                        alt="green iguana"
                                    />
                                </CardActionArea>
                            </Card>
                    }
                    <input type="file" id='uploadNewSlip' onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const file = URL.createObjectURL(e.target.files[0])
                            setNewSlip(file)
                            setImage(e.target.files[0])
                        }
                    }} hidden />

                    <TextField onChange={(e) => setSlip({ ...slip, detail: e.target.value })} style={{ width: '100%' }} id="filled-basic" label="รายละเอียดการอัปโหลด" variant="filled" />
                    <TextField onChange={(e) => setSlip({ ...slip, count: Number(e.target.value) })} style={{ width: '100%' }} type='number' label="จำนวนเงิน ไม่ต้องใส่บาท" variant="filled" />
                    <Button variant='contained' color='success' onClick={handleUpload}>เพิ่มสลิป</Button>
                </Box>
            </Modal>

        </div>
    );
}