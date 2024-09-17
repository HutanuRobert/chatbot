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
onStockExchange: (code: string) => void;
isClickable: boolean;
}

export default function TableComponent(props: tableProps) {
  return (
    <TableContainer sx={{width: "75%"}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}>Please select a stock exchange</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stockExchanges?.map((row) => (
            <TableRow
              key={row.stockExchange}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={() => props.isClickable ?  props.onStockExchange(row.code) : undefined} sx={{justifyContent : 'center', display: 'flex'}}>
                {row.stockExchange}
              </TableCell>
            </TableRow>			
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

