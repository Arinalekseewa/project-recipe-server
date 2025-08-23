import type { Location } from '../ref-utils.js';
import type { ErrorObject } from '@redocly/ajv/dist/2020.js';
import type { ResolveFn } from '../walk.js';
export declare function releaseAjvInstance(): void;
export declare function validateJsonSchema(data: any, schema: any, schemaLoc: Location, instancePath: string, resolve: ResolveFn, allowAdditionalProperties: boolean): {
    valid: boolean;
    errors: (ErrorObject & {
        suggest?: string[];
    })[];
};
//# sourceMappingURL=ajv.d.ts.map