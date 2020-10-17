import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import MyJournal from './MyJournal';

test('renders full calendar in my journal page', async () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const { getByText } = render(<MyJournal />);
  await waitFor(() => expect(getByText(/My Journal/i)).toBeInTheDocument());
  expect(getByText(/today/i)).toBeInTheDocument();
  expect(getByText(`${month} ${year}`)).toBeInTheDocument();
});
