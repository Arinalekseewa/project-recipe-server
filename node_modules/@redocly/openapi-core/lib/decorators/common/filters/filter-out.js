import { checkIfMatchByStrategy, filter } from './filter-helper.js';
const DEFAULT_STRATEGY = 'any';
export const FilterOut = ({ property, value, matchStrategy }) => {
    const strategy = matchStrategy || DEFAULT_STRATEGY;
    const filterOutCriteria = (item) => checkIfMatchByStrategy(item?.[property], value, strategy);
    return {
        any: {
            enter: (node, ctx) => {
                filter(node, ctx, filterOutCriteria);
            },
        },
    };
};
//# sourceMappingURL=filter-out.js.map