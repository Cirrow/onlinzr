import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { validateDimensions } from '$lib/validation';
import { errorMessage, boxDim, baseRate, boxVol } from '../store';
import { calculateBaseRate, calculateVolume } from '$lib/helper';

vi.mock('$lib/helper', () => ({
  calculateBaseRate: vi.fn().mockReturnValue(123),
  calculateVolume: vi.fn().mockReturnValue(6000),
}));

type ReturnPackage = {
    height: string;
    width: string;
    depth: string;
};

const makePackage = (overrides: Partial<ReturnPackage>): ReturnPackage => ({
    height: '10',
    width: '20',
    depth: '30',
    ...overrides,
});

describe('validateDimensions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (errorMessage.set as any) = vi.fn();
        (boxDim.set as any) = vi.fn();
        (baseRate.set as any) = vi.fn();
        (boxVol.set as any) = vi.fn();
    });

    // Happy path
    it('should accept valid numeric dimensions without units', () => {
        const result = validateDimensions(makePackage({}));

        expect(result).toBe(true);
        expect(errorMessage.set).not.toHaveBeenCalled();

        expect(boxDim.set).toHaveBeenCalledWith({ height: '10', width: '20', depth: '30' });
        expect(baseRate.set).toHaveBeenCalledWith(123);
        expect(boxVol.set).toHaveBeenCalledWith(6000);
    });

    it('should accept valid numeric dimensions with cm units', () => {
        const result = validateDimensions(makePackage({
            height: '15cm',
            width: '25cm',
            depth: '35cm',
        }));

        expect(result).toBe(true);
        expect(boxDim.set).toHaveBeenCalledWith({ height: '15', width: '25', depth: '35' });
    });

    // blanks
    it.each([
        [{ height: '', width: '10', depth: '10' }],
        [{ height: '10', width: '', depth: '10' }],
        [{ height: '10', width: '10', depth: '' }],
        [{ height: '   ', width: '10', depth: '10' }],
    ])('rejects blank input %o', (overrides) => {
        const result = validateDimensions(makePackage(overrides));

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith('Dimensions must not be blank.');
        expect(boxDim.set).not.toHaveBeenCalled();
    });

    // invalid units/letters
    it.each([
        [{ height: '10cmx', width: '20', depth: '30' }],
        [{ height: '10', width: '20in', depth: '30' }],
        [{ height: 'height', width: '20', depth: '30' }],
    ])('rejects invalid formatting %o', (overrides) => {
        const result = validateDimensions(makePackage(overrides));

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith(
            'Dimensions includes any other letters other than the units, or has invalid formatting.'
        );
        expect(boxDim.set).not.toHaveBeenCalled();
    });

    // too small
    it.each([
        [{ height: '4', width: '10', depth: '10' }],
        [{ height: '10', width: '4', depth: '10' }],
        [{ height: '10', width: '10', depth: '4' }],
    ])('rejects dimensions smaller than 5 %o', (overrides) => {
        const result = validateDimensions(makePackage(overrides));

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith('All dimensions must not be smaller than 5cm.');
        expect(boxDim.set).not.toHaveBeenCalled();
    });

    // too large
    it.each([
        [{ height: '101', width: '10', depth: '10' }],
        [{ height: '10', width: '101', depth: '10' }],
        [{ height: '10', width: '10', depth: '101' }],
    ])('rejects dimensions larger than 100 %o', (overrides) => {
        const result = validateDimensions(makePackage(overrides));

        expect(result).toBe(false);
        expect(errorMessage.set).toHaveBeenCalledWith('All dimensions must not exceed 100cm.');
        expect(boxDim.set).not.toHaveBeenCalled();
    });

    // edge case: values with extra whitespace
    it('should trim whitespace and accept valid numbers', () => {
        const result = validateDimensions(makePackage({
            height: '   12cm   ',
            width: ' 20 ',
            depth: '  30  ',
        }));

        expect(result).toBe(true);
        expect(boxDim.set).toHaveBeenCalledWith({ height: '12', width: '20', depth: '30' });
    });

    // non numeric values
    it.each([
        [{ height: 'abc', width: '20', depth: '30' }],
        [{ height: '10', width: 'x', depth: '30' }],
        [{ height: '10', width: '20', depth: 'y' }],
    ])('rejects non-numeric %o', (overrides) => {
        const result = validateDimensions(makePackage(overrides));

        expect(result).toBe(false);
        // function returns false without setting a specific error (silent fail)
        expect(errorMessage.set).not.toHaveBeenCalledWith('');
        expect(boxDim.set).not.toHaveBeenCalled();
    });
});
