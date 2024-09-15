import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from './table.component';
import { StockExchange } from '../../types/stockExchange';

const stockExchanges: StockExchange[] = [
{
	stockExchange: 'LSE',
	code: 'LSE',
	topStocks: []
  }
];
describe('<table />', () => {
  test('it should mount', () => {
    render(<TableComponent stockExchanges={stockExchanges}/>);

    const table = screen.getByTestId('table');

    expect(table).toBeInTheDocument();
  });
});