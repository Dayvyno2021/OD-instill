import { render, screen } from '@testing-library/react';
import HomeScreen from '../screens/HomeScreen';

test('renders the main page', () => {
  render(<HomeScreen />);
  const mainHeader = screen.getByText(/Search For Your Favorite Movie/i);
  expect(mainHeader).toBeInTheDocument();
});

