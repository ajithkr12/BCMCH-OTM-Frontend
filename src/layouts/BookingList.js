import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein,a,b) {
  return { name, calories, fat, carbs, protein,a,b };
}

const rows = [
  createData('ABG12345876', 'abccd','qwerty','Ggfgfgcv', 'N','Y','Y'),
  createData('ABG12345876', 'abccd','qwerty','Ggfgfgcv', 'N','Y','Y'),
  createData('ABG12345876', 'abccd','qwerty','Ggfgfgcv', 'N','Y','Y'),
  createData('ABG12345876', 'abccd','qwerty','Ggfgfgcv', 'N','Y','Y'),
  createData('ABG12345876', 'abccd','qwerty','Ggfgfgcv', 'N','Y','Y'),
];
const BookingList = () => {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Patient's UHID</TableCell>
          <TableCell align="right">Patient's Name</TableCell>
          <TableCell align="right">Surgeon's Name</TableCell>
          <TableCell align="right">Surgery's Name</TableCell>
          <TableCell align="right">PAC Status</TableCell>
          <TableCell align="right">Admit Status</TableCell>
          <TableCell align="right">Ready Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            hover
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            <TableCell align="right">{row.a}</TableCell>
            <TableCell align="right">{row.b}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default BookingList