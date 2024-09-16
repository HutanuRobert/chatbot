import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { Stock } from '../../types/stock';


interface stockProps {
	stock : Stock | null;
	onStockSelect: (stock: Stock) => void;
	onGoBackSelect: () => void;
	onMainMenuSelect: () => void;
}

export default function StockComponent(props: stockProps) {
	return(
  <div data-testid="stocks">
	<TableContainer component={Paper}>
   <Table sx={{ height: 200, width: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}> <p>{props?.stock?.stockName} is currently trading at {props?.stock?.price}</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		   <TableRow>
			<TableCell onClick={() => props.onMainMenuSelect()} sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Main Menu</p>
			</TableCell>
		   </TableRow>
		   <TableRow>
 			<TableCell onClick={() => props.onGoBackSelect()} sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Go back</p>
			</TableCell>
		   </TableRow>
        </TableBody>
      </Table>
	  </TableContainer>
  </div>
	);

}

