import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Fab } from '@mui/material';
import { SlipPayment } from '@/interfaces/slipPayment.model';
import { enviroment } from '@/constants/enviroment';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';
import { toastAlert } from '@/services/alert.service';
import { deleteByIdSlip } from '@/services/slipPayment.service';
import { useRouter } from 'next/navigation';

interface returnData{
    data: SlipPayment,
    onReload: () => void
}
export default function CardBooking({data, onReload}: returnData) {
    const router = useRouter()
    async function onDeleteSlip (id: string) {
        Swal.fire({
            title: "คุณแน่ใจ?",
            text: "คุณต้องการลบสลิปนี้หรือไม่",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ลบสลิป",
            cancelButtonText: 'ยกเลิก'
          }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteByIdSlip(id)
                onReload()
                toastAlert('ลบสลิปสำเสร็จ', 'success')
            }
          });
    }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={enviroment.baseImage + data.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            ราละเอียดสลิป: {data.detail}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             อัปโหลดเมื่อ: {data.create_date.split('T')[0]}
          </Typography>
            <Typography style={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                    <div onClick={() => onDeleteSlip(data.id)}>
                        <ClearIcon color='disabled' /> 
                    </div> 
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}