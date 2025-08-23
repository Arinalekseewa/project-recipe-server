export const NoCriteriaXpath = () => {
    return {
        CriterionObject: {
            enter(criteria, { report, location }) {
                if (!criteria.type) {
                    return;
                }
                if (criteria?.type?.type === 'xpath' || criteria?.type === 'xpath') {
                    report({
                        message: 'The `xpath` type criteria is not supported by Respect.',
                        location: location.child(['type']),
                    });
                }
            },
        },
    };
};
//# sourceMappingURL=no-criteria-xpath.js.map