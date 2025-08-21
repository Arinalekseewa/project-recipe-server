import { validateExample } from '../utils.js';
export const NoInvalidSchemaExamples = (opts) => {
    return {
        Schema: {
            leave(schema, ctx) {
                const examples = schema.examples;
                if (examples) {
                    for (const example of examples) {
                        validateExample(example, schema, ctx.location.child(['examples', examples.indexOf(example)]), ctx, !!opts.allowAdditionalProperties);
                    }
                }
                if (schema.example !== undefined) {
                    // Handle nullable example for OAS3
                    if (schema.nullable === true &&
                        schema.example === null &&
                        schema.type !== undefined) {
                        return;
                    }
                    validateExample(schema.example, schema, ctx.location.child('example'), ctx, true);
                }
            },
        },
    };
};
//# sourceMappingURL=no-invalid-schema-examples.js.map