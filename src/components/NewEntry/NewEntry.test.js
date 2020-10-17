import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import NewEntry from './NewEntry';

test('renders new journal entry', async () => {
  const props = {
    location: {
      state: {
        date: new Date(),
      },
    },
  };
  const { container, getByText } = render(<NewEntry {...props} />);
  await waitFor(() =>
    expect(getByText(/New Journal Entry/i)).toBeInTheDocument(),
  );
  expect(container).toMatchSnapshot();
});
