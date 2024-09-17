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
	onGoBackSelect: () => void;
	onMainMenuSelect: () => void;
	isClickable: boolean;
}

export default function StockComponent(props: stockProps) {
	return(
  <div data-testid="stocks">
	<TableContainer sx={{width: "75%"}} component={Paper}>
   <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='bg-blue-100' sx={{justifyContent : 'center', display: 'flex'}}> <p>{props?.stock?.stockName} is currently trading at {props?.stock?.price}</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		   <TableRow>
			<TableCell onClick={() => props.isClickable ? props.onMainMenuSelect() : undefined} sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Main Menu</p>
			</TableCell>
		   </TableRow>
		   <TableRow>
 			<TableCell onClick={() => props.isClickable ? props.onGoBackSelect() : undefined} sx={{justifyContent : 'center', display: 'flex'}}>
		  		<p>Go back</p>
			</TableCell>
		   </TableRow>
        </TableBody>
      </Table>
	  </TableContainer>
  </div>
	);

}

