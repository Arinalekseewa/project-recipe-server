import { checkIfMatchByStrategy, filter } from './filter-helper.js';
const DEFAULT_STRATEGY = 'any';
export const FilterIn = ({ property, value, matchStrategy }) => {
    const strategy = matchStrategy || DEFAULT_STRATEGY;
    const filterInCriteria = (item) => item?.[property] && !checkIfMatchByStrategy(item?.[property], value, strategy);
    return {
        any: {
            enter: (node, ctx) => {
                filter(node, ctx, filterInCriteria);
            },
        },
    };
};
//# sourceMappingURL=filter-in.js.map