import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import App from './App';

test('renders hello in main', async () => {
  const { getByText } = render(<App />);
  await waitFor(() =>
    expect(getByText(/Welcome to Calendar Journal/i)).toBeInTheDocument(),
  );
});
