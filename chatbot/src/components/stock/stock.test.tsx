import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockComponent from './stock';

describe('<stocks />', () => {
  test('it should mount', () => {
    render(<StockComponent isClickable={true} onMainMenuSelect={() => {}} onGoBackSelect={() => {}} stock={null}/>);

    const stocks = screen.getByTestId('stocks');

    expect(stocks).toBeInTheDocument();
  });
});