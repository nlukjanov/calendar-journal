import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render } from '@testing-library/react';
import Signin from './Signin';

test('renders new journal entry', async () => {
  const { container } = render(<Signin />);
  expect(container).toMatchSnapshot();
});
