import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import ErrorPage from './ErrorPage';

test('renders error message on error page', async () => {
  const { getByText } = render(<ErrorPage />);
  await waitFor(() =>
    expect(
      getByText(/Something went wrong, please try again/i)
    ).toBeInTheDocument()
  );
});
