import * as process from 'node:process';
/**
 * Sanitizes the input path by removing invalid characters.
 */
export const sanitizePath = (input) => {
    return input.replace(/[^a-zA-Z0-9 ._\-:\\/@]/g, '');
};
/**
 * Sanitizes the input locale (ex. en-US) by removing invalid characters.
 */
export const sanitizeLocale = (input) => {
    return input.replace(/[^a-zA-Z0-9@._-]/g, '');
};
/**
 * Retrieves platform-specific arguments and utilities.
 */
export function getPlatformSpawnArgs() {
    const isWindowsPlatform = process.platform === 'win32';
    const npxExecutableName = isWindowsPlatform ? 'npx.cmd' : 'npx';
    const sanitizeIfWindows = (input, sanitizer) => {
        if (isWindowsPlatform && input) {
            return sanitizer(input);
        }
        else {
            return input || '';
        }
    };
    return { npxExecutableName, sanitize: sanitizeIfWindows, shell: isWindowsPlatform };
}
//# sourceMappingURL=platform.js.map