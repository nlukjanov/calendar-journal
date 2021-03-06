import React from 'react';

import { render, waitFor } from '@testing-library/react';
import ErrorPage from './ErrorPage';

test('renders error message on error page', async () => {
  const { container, getByText } = render(<ErrorPage />);
  await waitFor(() =>
    expect(
      getByText(/Something went wrong, please try again/i),
    ).toBeInTheDocument(),
  );
  expect(container).toMatchSnapshot();
});
