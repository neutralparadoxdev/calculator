import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Check for Legal', () => {
  render(<App />);
  const legalButton = screen.getByText("Legal Disclaimer / License")
  expect(legalButton).toBeInTheDocument();
});