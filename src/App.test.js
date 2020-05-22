import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hello in main', () => {
  const { getByText } = render(<App />);
  const landing = getByText(/hello/i);
  expect(landing).toBeInTheDocument();
});
