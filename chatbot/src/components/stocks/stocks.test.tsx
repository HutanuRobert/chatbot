import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stocks from './stocks';

describe('<stocks />', () => {
  test('it should mount', () => {
    render(<Stocks  onMainMenuSelect={() => {}} onGoBackSelect={() => {}} onStockSelect={() => {}} stocks={[]} isClickable={true}/>);

    const stocks = screen.getByTestId('stocks');

    expect(stocks).toBeInTheDocument();
  });
});