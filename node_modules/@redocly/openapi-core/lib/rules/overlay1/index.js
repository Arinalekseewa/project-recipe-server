import { Assertions } from '../common/assertions/index.js';
import { InfoContact } from '../common/info-contact.js';
import { Struct } from '../common/struct.js';
import { NoUnresolvedRefs } from '../common/no-unresolved-refs.js';
export const rules = {
    'info-contact': InfoContact,
    struct: Struct,
    'no-unresolved-refs': NoUnresolvedRefs,
    assertions: Assertions,
};
export const preprocessors = {};
//# sourceMappingURL=index.js.map