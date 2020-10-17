import React from 'react';
// eslint-disable-next-line node/no-unpublished-import
import { render } from '@testing-library/react';
import Signup from './Signup';

test('renders new journal entry', () => {
  const { container } = render(<Signup />);
  expect(container).toMatchSnapshot();
});
