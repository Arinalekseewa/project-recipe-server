import { listOf } from './index.js';
const Root = {
    properties: {
        overlay: { type: 'string' },
        info: 'Info',
        extends: { type: 'string' },
        actions: 'Actions',
    },
    required: ['overlay', 'info', 'actions'],
    extensionsPrefix: 'x-',
};
const Info = {
    properties: {
        title: { type: 'string' },
        version: { type: 'string' },
    },
    required: ['title', 'version'],
    extensionsPrefix: 'x-',
};
const Actions = listOf('Action');
const Action = {
    properties: {
        target: { type: 'string' },
        description: { type: 'string' },
        update: {}, // any
        remove: { type: 'boolean' },
    },
    required: ['target'],
    extensionsPrefix: 'x-',
};
export const Overlay1Types = {
    Root,
    Info,
    Actions,
    Action,
};
//# sourceMappingURL=overlay.js.map