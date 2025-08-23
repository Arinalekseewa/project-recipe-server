import { HandledError } from '@redocly/openapi-core';
// Is used to abort the flow of execution - will be catched in the command execution wrapper
export class AbortFlowError extends Error {
}
export function exitWithError(message) {
    throw new HandledError(message);
}
//# sourceMappingURL=error.js.map