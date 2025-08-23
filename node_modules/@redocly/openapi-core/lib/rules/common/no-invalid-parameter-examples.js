import { validateExample } from '../utils.js';
export const NoInvalidParameterExamples = (opts) => {
    return {
        Parameter: {
            leave(parameter, ctx) {
                if (parameter.example !== undefined) {
                    validateExample(parameter.example, parameter.schema, ctx.location.child('example'), ctx, !!opts.allowAdditionalProperties);
                }
                if (parameter.examples) {
                    for (const [key, example] of Object.entries(parameter.examples)) {
                        if ('value' in example) {
                            validateExample(example.value, parameter.schema, ctx.location.child(['examples', key]), ctx, true);
                        }
                    }
                }
            },
        },
    };
};
//# sourceMappingURL=no-invalid-parameter-examples.js.map