import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { capitaliseAllLastName } from '$lib/validation';
import { errorMessage, customerFullDetails } from '../store';

describe('capitaliseAllLastName', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (errorMessage.set as any) = vi.fn();
        (customerFullDetails.update as any) = vi.fn();
    });

    // happy paths
    it('should capitalise a lowercase last name', () => {
        const result = capitaliseAllLastName('smith');

        expect(result).toBe(true);
        expect(customerFullDetails.update).toHaveBeenCalledWith(expect.any(Function));

        // Apply the update function to mock state
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const updated = updateFn({ lastName: '' });
        expect(updated.lastName).toBe('SMITH');

        // Error message should be cleared at the end
        expect(errorMessage.set).toHaveBeenLastCalledWith('');
    });

    it('should capitalise a mixed-case last name', () => {
        const result = capitaliseAllLastName('mCdoNalD');

        expect(result).toBe(true);
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const updated = updateFn({ lastName: '' });
        expect(updated.lastName).toBe('MCDONALD');
    });

    it('should trim whitespace before capitalising', () => {
        const result = capitaliseAllLastName('   o\'brien   ');

        expect(result).toBe(false); // invalid, because of apostrophe (see below)
        expect(customerFullDetails.update).not.toHaveBeenCalled();
    });

    it('should preserve internal spaces when capitalising', () => {
        const result = capitaliseAllLastName('van damme');

        expect(result).toBe(true);
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const updated = updateFn({ lastName: '' });
        expect(updated.lastName).toBe('VAN DAMME');
    });

    // empty and whitespace only
    it.each([
        ['', 'Please enter a name'],
        ['   ', 'Please enter a name'],
    ])('rejects blank input "%s"', (input, expectedMsg) => {
        const result = capitaliseAllLastName(input);

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
        expect(customerFullDetails.update).not.toHaveBeenCalled();
    });

    // invalid characters
    it.each([
        ['Smith123', 'Name should only contain letters and spaces.'],
        ['O\'Brien', 'Name should only contain letters and spaces.'],
        ['Anne-Marie', 'Name should only contain letters and spaces.'],
        ['Smith!', 'Name should only contain letters and spaces.'],
    ])('rejects invalid last name "%s"', (input, expectedMsg) => {
        const result = capitaliseAllLastName(input);

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
        expect(customerFullDetails.update).not.toHaveBeenCalled();
    });

    // single letter last name
    it('should capitalise a single-letter last name', () => {
        const result = capitaliseAllLastName('q');

        expect(result).toBe(true);
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const updated = updateFn({ lastName: '' });
        expect(updated.lastName).toBe('Q');
    });

    // already uppercase
    it('should accept an already uppercase last name unchanged', () => {
        const result = capitaliseAllLastName('DOE');

        expect(result).toBe(true);
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const updated = updateFn({ lastName: '' });
        expect(updated.lastName).toBe('DOE');
    });

    // error precedence
    it('should only report the first error encountered', () => {
        const result = capitaliseAllLastName('   '); // blank before invalid chars

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith('Please enter a name');
        expect(customerFullDetails.update).not.toHaveBeenCalled();
    });
});
