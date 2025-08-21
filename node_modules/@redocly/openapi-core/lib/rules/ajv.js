import addFormats from 'ajv-formats';
import Ajv from '@redocly/ajv/dist/2020.js';
import { escapePointer } from '../ref-utils.js';
let ajvInstance = null;
export function releaseAjvInstance() {
    ajvInstance = null;
}
function getAjv(resolve, allowAdditionalProperties) {
    if (!ajvInstance) {
        ajvInstance = new Ajv({
            schemaId: '$id',
            meta: true,
            allErrors: true,
            strictSchema: false,
            inlineRefs: false,
            validateSchema: false,
            discriminator: true,
            allowUnionTypes: true,
            validateFormats: true,
            defaultUnevaluatedProperties: allowAdditionalProperties,
            loadSchemaSync(base, $ref, $id) {
                const resolvedRef = resolve({ $ref }, base.split('#')[0]);
                if (!resolvedRef || !resolvedRef.location)
                    return false;
                return { $id: resolvedRef.location.source.absoluteRef + '#' + $id, ...resolvedRef.node };
            },
            logger: false,
        });
        addFormats(ajvInstance); // TODO: fix type mismatch
    }
    return ajvInstance;
}
function getAjvValidator(schema, loc, resolve, allowAdditionalProperties) {
    const ajv = getAjv(resolve, allowAdditionalProperties);
    if (!ajv.getSchema(loc.absolutePointer)) {
        ajv.addSchema({ $id: loc.absolutePointer, ...schema }, loc.absolutePointer);
    }
    return ajv.getSchema(loc.absolutePointer);
}
export function validateJsonSchema(data, schema, schemaLoc, instancePath, resolve, allowAdditionalProperties) {
    const validate = getAjvValidator(schema, schemaLoc, resolve, allowAdditionalProperties);
    if (!validate)
        return { valid: true, errors: [] }; // unresolved refs are reported
    const valid = validate(data, {
        instancePath,
        parentData: { fake: {} },
        parentDataProperty: 'fake',
        rootData: {},
        dynamicAnchors: {},
    });
    return {
        valid: !!valid,
        errors: (validate.errors || []).map(beatifyErrorMessage),
    };
    function beatifyErrorMessage(error) {
        let message = error.message;
        const suggest = error.keyword === 'enum' ? error.params.allowedValues : undefined;
        if (suggest) {
            message += ` ${suggest.map((e) => `"${e}"`).join(', ')}`;
        }
        if (error.keyword === 'type') {
            message = `type ${message}`;
        }
        const relativePath = error.instancePath.substring(instancePath.length + 1);
        const propName = relativePath.substring(relativePath.lastIndexOf('/') + 1);
        if (propName) {
            message = `\`${propName}\` property ${message}`;
        }
        if (error.keyword === 'additionalProperties' || error.keyword === 'unevaluatedProperties') {
            const property = error.params.additionalProperty || error.params.unevaluatedProperty;
            message = `${message} \`${property}\``;
            error.instancePath += '/' + escapePointer(property);
        }
        return {
            ...error,
            message,
            suggest,
        };
    }
}
//# sourceMappingURL=ajv.js.map