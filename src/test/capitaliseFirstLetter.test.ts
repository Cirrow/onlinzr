import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { capitaliseFirstLetter } from '$lib/validation';
import { errorMessage, userFirstName } from '../store';

describe('capitaliseFirstLetter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (errorMessage.set as any) = vi.fn();
        (userFirstName.set as any) = vi.fn();
    });

    // Happy path test
    it('should capitalise the first letter of a valid name', () => {
        const result = capitaliseFirstLetter('alice');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('Alice');
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    it('should handle already-capitalised names', () => {
        const result = capitaliseFirstLetter('Bob');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('Bob'); // unchanged
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    it('should preserve remaining characters beyond the first', () => {
        const result = capitaliseFirstLetter('charlie brown');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('Charlie brown');
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    // Empty string & whitespace
    it.each([
        ['', 'Please enter a name'],
        ['   ', 'Please enter a name'],
    ])('rejects "%s"', (input, expectedMsg) => {
        const result = capitaliseFirstLetter(input);

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
        expect(userFirstName.set).not.toHaveBeenCalled();
    });

    // Invalid characters
    it.each([
        ['John123', 'Name should only contain letters and spaces.'],
        ['Jane_Doe', 'Name should only contain letters and spaces.'],
        ['Anna!', 'Name should only contain letters and spaces.'],
        ['Mary-Jane', 'Name should only contain letters and spaces.'],
    ])('rejects invalid name "%s"', (input, expectedMsg) => {
        const result = capitaliseFirstLetter(input);

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
        expect(userFirstName.set).not.toHaveBeenCalled();
    });

    // Edge case: single character
    it('should capitalise a single lowercase letter', () => {
        const result = capitaliseFirstLetter('z');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('Z');
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    it('should accept a single uppercase letter unchanged', () => {
        const result = capitaliseFirstLetter('Q');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('Q');
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    // Edge case: multiple spaces inside
    it('should capitalise correctly when name contains internal spaces', () => {
        const result = capitaliseFirstLetter('   david   smith  ');

        expect(result).toBe(true);
        expect(userFirstName.set).toHaveBeenCalledWith('David   smith'); 
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    // Precedence: should stop at first error (empty before invalid chars)
    it('should only report empty error if input is whitespace + digits', () => {
        const result = capitaliseFirstLetter('   ');

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith('Please enter a name');
        expect(userFirstName.set).not.toHaveBeenCalled();
    });
});
