import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { Stock } from '../../types/stock';


interface stocksProps {
	stocks : Stock[] | null;
	onStockSelect: (stock: Stock) => void;
	isClickable: boolean;
	onGoBackSelect: () => void;
	onMainMenuSelect: () => void;
}

export default function StocksComponent(props: stocksProps) {
	console.log(props.stocks);
	return(
  <div data-testid="stocks">
	<TableContainer component={Paper}>
   <Table sx={{ height: 200, width: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}>Please select a Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stocks?.map((row) => (
            <TableRow
              key={row.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={() => props.isClickable ?  props.onStockSelect(row) : undefined} sx={{justifyContent : 'center', display: 'flex'}}>
                {row.stockName}
              </TableCell>
            </TableRow>
          ))}
		 <TableRow>
			<TableCell onClick={() =>props.onMainMenuSelect() } sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Main Menu</p>
			</TableCell>
		   </TableRow>
		   <TableRow>
 			<TableCell onClick={() =>props.onGoBackSelect() } sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Go back</p>
			</TableCell>
		   </TableRow>
		</TableBody>
      </Table>
	  </TableContainer>
  </div>
	);
}
