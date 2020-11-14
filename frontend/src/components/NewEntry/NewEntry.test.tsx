import React from 'react';

import { render, waitFor } from '@testing-library/react';
import NewEntry from './NewEntry';

test('renders new journal entry', async () => {
  const props = {
    location: {
      state: {
        date: new Date('2020-11-03T20:12'),
      },
    },
  };
  const { container, getByText } = render(<NewEntry {...props} />);
  await waitFor(() =>
    expect(getByText(/New Journal Entry/i)).toBeInTheDocument(),
  );
  expect(container).toMatchSnapshot();
});
