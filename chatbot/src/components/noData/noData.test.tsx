import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoDataComponent from './noData';

describe('<noData />', () => {
  test('it should mount', () => {
    render(<NoDataComponent />);

    const noData = screen.getByTestId('noData');

    expect(noData).toBeInTheDocument();
  });
});