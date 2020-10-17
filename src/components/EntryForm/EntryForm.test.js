import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render } from '@testing-library/react';
import EntryForm from './EntryForm';

test('renders new journal entry', async () => {
  const { container } = render(<EntryForm />);
  expect(container).toMatchSnapshot();
});
