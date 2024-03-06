'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import { Bookings } from '@/interfaces/booking.model';
import { deleteById } from '@/services/booking.service';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { toastAlert } from '@/services/alert.service';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TypeBooking{
  data: Bookings[],
  retutnId: (id: string) => void
}


export default function TableBooking({data, retutnId}: TypeBooking) {
  
  function Ondelete(id: string){
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
        await deleteById(id)
        retutnId(id)
        toastAlert('deleted!!!', 'success')
      }
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>detail</StyledTableCell>
            <StyledTableCell>status</StyledTableCell>
            <StyledTableCell>start_date</StyledTableCell>
            <StyledTableCell>end_date</StyledTableCell>
            <StyledTableCell>booking_by</StyledTableCell>
            <StyledTableCell>parking name</StyledTableCell>
            <StyledTableCell>payments</StyledTableCell>
            <StyledTableCell>price</StyledTableCell>
            <StyledTableCell>action</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((r, i) => (
            <StyledTableRow key={r.id}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell>{r.detail}</StyledTableCell>
              <StyledTableCell>{r.status}</StyledTableCell>
              <StyledTableCell>{r.start_date.toString().split('T')[0]}</StyledTableCell>
              <StyledTableCell>{r.end_date.toString().split('T')[0]}</StyledTableCell>
              <StyledTableCell>{r.booking_by}</StyledTableCell>
              <StyledTableCell>{r.parkings?.name_park}</StyledTableCell>
              <StyledTableCell>{r.payments?.status_payment}</StyledTableCell>
              <StyledTableCell>{r.payments?.count}</StyledTableCell>
              <StyledTableCell>
                <Button type='button' variant='contained' color='primary'>edit</Button>
                <Button type='button' variant='contained' color='error' onClick={() => Ondelete(r.id)}>delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
