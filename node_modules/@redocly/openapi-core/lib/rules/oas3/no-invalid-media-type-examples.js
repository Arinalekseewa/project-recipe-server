import { isRef } from '../../ref-utils.js';
import { validateExample } from '../utils.js';
export const ValidContentExamples = (opts) => {
    return {
        MediaType: {
            leave(mediaType, ctx) {
                const { location, resolve } = ctx;
                if (!mediaType.schema)
                    return;
                if (mediaType.example !== undefined) {
                    resolveAndValidateExample(mediaType.example, location.child('example'));
                }
                else if (mediaType.examples) {
                    for (const exampleName of Object.keys(mediaType.examples)) {
                        resolveAndValidateExample(mediaType.examples[exampleName], location.child(['examples', exampleName, 'value']), true);
                    }
                }
                function resolveAndValidateExample(example, location, isMultiple) {
                    if (isRef(example)) {
                        const resolved = resolve(example);
                        if (!resolved.location)
                            return;
                        location = isMultiple ? resolved.location.child('value') : resolved.location;
                        example = resolved.node;
                    }
                    if (isMultiple && typeof example?.value === 'undefined') {
                        return;
                    }
                    validateExample(isMultiple ? example.value : example, mediaType.schema, location, ctx, !!opts.allowAdditionalProperties);
                }
            },
        },
    };
};
//# sourceMappingURL=no-invalid-media-type-examples.js.map