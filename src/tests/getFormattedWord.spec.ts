//import { getFormattedWord } from "../components/actions/getFormattedWord.js";
import { getFormattedWord } from "../actions/getFormattedWord.js";
//import { test, expect } from "jest";
import { test, expect } from '@jest/globals';

test('capitalizes the first letter of a word', () => {
    expect(getFormattedWord('hello')).toBe('Hello');
});