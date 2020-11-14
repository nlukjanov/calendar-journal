import React from 'react';

import { render } from '@testing-library/react';
import EntryForm from './EntryForm';

test('renders entry form correctly', async () => {
  const formData = {
    date: '',
    title: '',
    entryText: '',
  };
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const { container } = render(
    <EntryForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />,
  );
  expect(container).toMatchSnapshot();
});
