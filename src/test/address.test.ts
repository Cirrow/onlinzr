import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { validateAddress } from '$lib/validation';
import { errorMessage, customerFullDetails } from '../store';

type Address = {
    street: string;
    city: string;
    region: string;
    postal: string;
};

const makeAddress = (overrides: Partial<Address>): Address => ({
    street: '123 Main St',
    city: 'Springfield',
    region: 'Illinois',
    postal: '1234',
    ...overrides
});

describe('validateAddress', () => {
    // reset mocks before each test
    beforeEach(() => {
        vi.clearAllMocks();
        (errorMessage.set as any) = vi.fn();
        (customerFullDetails.update as any) = vi.fn();
    });

    // Happy path test // should accept valid addresses
    it('should return true and update customer details for a valid address', () => {
        const validAddress = makeAddress({});

        const result = validateAddress(validAddress);

        expect(result).toBe(true);
        // shouldn't set any error
        expect(errorMessage.set).not.toHaveBeenCalled();
        // should update customer details
        expect(customerFullDetails.update).toHaveBeenCalledWith(expect.any(Function));

        // verify the update function transforms the address correctly
        const updateFn = (customerFullDetails.update as unknown as Mock).mock.calls[0][0];
        const mockDetails = { address: { street: '', city: '', region: '' } };
        const updatedDetails = updateFn(mockDetails);

        expect(updatedDetails.address.street).toBe('123 MAIN ST');
        expect(updatedDetails.address.city).toBe('SPRINGFIELD');
        expect(updatedDetails.address.region).toBe('ILLINOIS');
    });

    describe('street validation', () => {
        // Test various invalid street formats
        it.each([
            ['123 456', 'Street does not include a house number, and/or is malformed.'],
            ['Main Street', 'Street does not include a house number, and/or is malformed.'],
            ['123 Main@St', 'Street does not include a house number, and/or is malformed.'],
            ['', 'Street does not include a house number, and/or is malformed.'],
        ])('rejects street "%s"', (street, expectedMsg) => {
            const result = validateAddress(makeAddress({ street }));

            expect(result).toBe(false);
            expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
            expect(customerFullDetails.update).not.toHaveBeenCalled();
        });
    });

    describe('city validation', () => {
        // test various invalid city formats
        it.each([
            ['Auckland1', 'City should contain only letters.'],
            ['Auck-land', 'City should contain only letters.'],
            ['', 'City should contain only letters.'],
        ])('rejects city "%s"', (city, expectedMsg) => {
            const result = validateAddress(makeAddress({ city }));

            expect(result).toBe(false);
            expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
            expect(customerFullDetails.update).not.toHaveBeenCalled();
        });
    });

    describe('region validation', () => {
        // Test various invalid region formats
        it.each([
            ['Canterbury1', 'Region should contain only letters.'],
            ['Canterb@ry', 'Region should contain only letters.'],
            ['', 'Region should contain only letters.'],
        ])('rejects region "%s"', (region, expectedMsg) => {
            const result = validateAddress(makeAddress({ region }));

            expect(result).toBe(false);
            expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
            expect(customerFullDetails.update).not.toHaveBeenCalled();
        });
    });

    describe('postal code validation', () => {
        // Test various invalid postal code formats
        it.each([
            ['12a4', 'Postal code is in an invalid format'],
            ['12-4', 'Postal code is in an invalid format'],
            ['123', 'Postal code is in an invalid format'],
            ['12345', 'Postal code is in an invalid format'],
            ['', 'Postal code is in an invalid format'],
        ])('rejects postal "%s"', (postal, expectedMsg) => {
            const result = validateAddress(makeAddress({ postal }));

            expect(result).toBe(false);
            expect(errorMessage.set).toHaveBeenCalledWith(expectedMsg);
            expect(customerFullDetails.update).not.toHaveBeenCalled();
        });
    });

    // Verify we only report the first error found
    it('should only report the first validation error encountered', () => {
        const invalidAddress = makeAddress({
            street: 'Main Street',   // Invalid first
            city: 'Springfield1',    // Would also be invalid
        });

        const result = validateAddress(invalidAddress);

        expect(result).toBe(false);
        // Should only report the street error
        expect(errorMessage.set).toHaveBeenCalledWith(
            'Street does not include a house number, and/or is malformed.'
        );
        expect(customerFullDetails.update).not.toHaveBeenCalled();
    });
});