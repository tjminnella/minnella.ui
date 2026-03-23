import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, test } from '@jest/globals';
//import Users from '../components/lessons/Users';
import Users from '../pages/Utility/Users';

test('renders User List', () => {
    const { getByText } = render(<Users />);
    expect(getByText(/User List/i)).toBeTruthy();
});