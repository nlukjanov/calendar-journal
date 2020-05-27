import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import MyJournal from './MyJournal';

test('renders hello in main', async () => {
  const { getByText } = render(<MyJournal />);
  await waitFor(() => expect(getByText(/My Journal/i)).toBeInTheDocument());
});
