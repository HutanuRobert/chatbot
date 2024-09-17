import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockExchangeComponent from './stockExchange';
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
    render(<StockExchangeComponent onStockExchange={() => {}} stockExchanges={stockExchanges} isClickable={true}/>);

    const table = screen.getByTestId('table');

    expect(table).toBeInTheDocument();
  });
});