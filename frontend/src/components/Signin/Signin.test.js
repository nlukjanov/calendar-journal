import React from 'react';

import { render } from '@testing-library/react';
import Signin from './Signin';

test('renders new journal entry', () => {
  const { container } = render(<Signin />);
  expect(container).toMatchSnapshot();
});
