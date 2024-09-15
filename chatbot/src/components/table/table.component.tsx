import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StockExchange } from '../../types/stockExchange';


interface tableProps {
stockExchanges: StockExchange[] | undefined;
}

export default function TableComponent(props: tableProps) {
	console.log(props.stockExchanges);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ height: 200, width: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}>Dessert (100g serving)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stockExchanges?.map((row) => (
            <TableRow
              key={row.stockExchange}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{justifyContent : 'center', display: 'flex'}}>
                {row.stockExchange}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

