import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from './table.component';

describe('<table />', () => {
  test('it should mount', () => {
    render(<TableComponent />);

    const table = screen.getByTestId('table');

    expect(table).toBeInTheDocument();
  });
});