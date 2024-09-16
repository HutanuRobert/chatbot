import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockComponent from './stock';

describe('<stocks />', () => {
  test('it should mount', () => {
    render(<StockComponent  onMainMenuSelect={() => {}} onGoBackSelect={() => {}} onStockSelect={() => {}} stock={null}/>);

    const stocks = screen.getByTestId('stocks');

    expect(stocks).toBeInTheDocument();
  });
});