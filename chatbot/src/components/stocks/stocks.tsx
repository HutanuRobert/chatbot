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
	tableKey: number;
	stocks : Stock[] | null;
	onStockSelect: (stock: Stock,tableKey: number) => void;
	isClickable: boolean;
	onGoBackSelect: () => void;
	onMainMenuSelect: () => void;
}

export default function StocksComponent(props: stocksProps) {
	return(
  <div data-testid="stocks">
	<TableContainer sx={{width: "75%"}} component={Paper}>
   <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}>Please select a Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stocks?.map((row) => (
            <TableRow key={row.code}>
              <TableCell component="th" scope="row" onClick={() => props.isClickable ?  props.onStockSelect(row, props.tableKey): undefined } sx={{justifyContent : 'center', display: 'flex'}}>
                {row.stockName}
              </TableCell>
            </TableRow>
          ))}
		 <TableRow>
			<TableCell onClick={() => props.isClickable ? props.onMainMenuSelect() : undefined } sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Main Menu</p>
			</TableCell>
		   </TableRow>
		   <TableRow>
 			<TableCell onClick={() => props.isClickable ? props.onGoBackSelect() : undefined } sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Go back</p>
			</TableCell>
		   </TableRow>
		</TableBody>
      </Table>
	  </TableContainer>
  </div>
	);
}
