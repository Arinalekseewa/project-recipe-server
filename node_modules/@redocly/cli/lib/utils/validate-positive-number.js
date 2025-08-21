export function validatePositiveNumber(optionName, requireInteger = false) {
    return (arg) => {
        const num = Number(arg);
        if (isNaN(num) || num <= 0) {
            throw new Error(`${optionName} must be a positive number`);
        }
        if (requireInteger && !Number.isInteger(num)) {
            throw new Error(`${optionName} must be a positive integer`);
        }
        return num;
    };
}
//# sourceMappingURL=validate-positive-number.js.map