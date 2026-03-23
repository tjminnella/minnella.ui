//import React from 'react';
import { render } from '@testing-library/react';
//import { render, screen } from '@testing-library/react';
import { test } from '@jest/globals';
//import { test, expect } from '@jest/globals';
//import Users from '../components/lessons/currencyConverter';
import Users from '../pages/Utility/Users';

test('renders User List', () => {
    render(<Users />);
    //const linkElement = screen.getByText(/User List/i);
    //expect(linkElement).toBeInTheDocument();
});