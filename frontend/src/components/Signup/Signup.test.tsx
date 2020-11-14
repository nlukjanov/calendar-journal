import React from 'react';

import { render } from '@testing-library/react';
import Signup from './Signup';

test('renders new journal entry', () => {
  const { container } = render(<Signup />);
  expect(container).toMatchSnapshot();
});
