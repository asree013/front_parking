import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './card.css'
import { Parks } from '@/interfaces/park.model';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { enviroment } from '@/constants/enviroment';
import Loadding from '../load/Loadding';

interface TypeParmiter {
  data: Parks,
  query: { start_date: string, end_date: string }
}

export default function MediaCard({ data, query }: TypeParmiter) {

  const url = usePathname()
  const router = useRouter()
  const baseImage = `${enviroment.baseImage}`

  const [load, setLoad] = React.useState<boolean>(false)

  const [parks, setParks] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (url.toString() === '/park') {
      setParks(true)
    }
    else {
      setParks(false)
    }
  }, [])
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className='bg_card'>
        <CardMedia
          sx={{ height: 140 }}
          image={data.image_park ? `${baseImage}${data.image_park}` : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
          title={data.image_park}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name_park}
          </Typography>
        </CardContent>
        {
          parks === true
            ? <CardActions style={{ justifyContent: 'space-between' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <Button size="large" style={{ color: 'black', marginTop: '-25px' }}>สถานะ:</Button>
                <Button size="large" style={{ color: 'green', marginTop: '-25px' }}>{data.active === false ? <p style={{ color: 'red' }}>ห้ามใช้</p> : <p style={{ color: 'green' }}>ใช้งาน</p>}</Button>
              </div>
              <Button size="large" variant='contained' onClick={() => router.push('/park/' + data.id)}>เลือก</Button>
            </CardActions>
            : <CardActions style={{ justifyContent: 'space-between' }}>
              <Button size="large" style={{ color: 'green' }}>จองเลย!!</Button>
              <Button variant='contained' disabled={Boolean(data.active === false)} onClick={() => {
                setLoad(true)
                router.push(`/park/${data.id}/add/?start=${query.start_date}&end=${query.end_date}`)
              }
              } size="large">{data.active === false ? 'ห้ามจอง' : 'จอง'}</Button>
            </CardActions>
        }
      </Card>
      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}