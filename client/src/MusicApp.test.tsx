import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MusicApp from './MusicApp';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MusicApp />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
