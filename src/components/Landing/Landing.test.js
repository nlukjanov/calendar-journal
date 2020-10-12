import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line node/no-unpublished-import
import { render, waitFor } from '@testing-library/react';
import Landing from './Landing';

test('renders welcome on landing page', async () => {
  const { getByText } = render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>,
  );
  await waitFor(() =>
    expect(getByText(/Welcome to Calendar Journal/i)).toBeInTheDocument(),
  );
  expect(
    getByText('Take your notes and keep your memories'),
  ).toBeInTheDocument();
});
