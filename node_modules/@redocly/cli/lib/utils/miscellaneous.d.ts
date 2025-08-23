import type { Config, Oas3Definition, Oas2Definition, Exact } from '@redocly/openapi-core';
import type { Totals, Entrypoint, OutputExtension, CommandArgv } from '../types.js';
export type ExitCode = 0 | 1 | 2;
export declare function getFallbackApisOrExit(argsApis: string[] | undefined, config: Config): Promise<Entrypoint[]>;
export declare function getExecutionTime(startedAt: number): string;
export declare function printExecutionTime(commandName: string, startedAt: number, api: string): void;
export declare function pathToFilename(path: string, pathSeparator: string): string;
export declare function escapeLanguageName(lang: string): string;
export declare function langToExt(lang: string): any;
export declare class CircularJSONNotSupportedError extends Error {
    originalError: Error;
    constructor(originalError: Error);
}
export declare function dumpBundle(obj: any, format: OutputExtension, dereference?: boolean): string;
export declare function saveBundle(filename: string, output: string): void;
export declare function promptUser(query: string, hideUserInput?: boolean): Promise<string>;
export declare function readYaml(filename: string): unknown;
export declare function writeToFileByExtension(data: unknown, filePath: string, noRefs?: boolean): void;
export declare function writeYaml(data: any, filename: string, noRefs?: boolean): void;
export declare function writeJson(data: unknown, filename: string): void;
export declare function getAndValidateFileExtension(fileName: string): NonNullable<OutputExtension>;
export declare function handleError(e: Error, ref: string): never;
export declare function printLintTotals(totals: Totals, definitionsCount: number): void;
export declare function printConfigLintTotals(totals: Totals, command?: string | number): void;
export declare function getOutputFileName({ entrypoint, output, argvOutput, ext, entries, }: {
    entrypoint: string;
    output?: string;
    argvOutput?: string;
    ext?: OutputExtension;
    entries: number;
}): {
    ext: "json" | "yaml" | "yml";
    outputFile?: undefined;
} | {
    outputFile: string;
    ext: "json" | "yaml" | "yml";
};
export declare function printUnusedWarnings(config: Config): void;
export declare function loadConfigAndHandleErrors(argv: Exact<CommandArgv>, version: string): Promise<Config>;
export declare function sortTopLevelKeysForOas(document: Oas3Definition | Oas2Definition): Oas3Definition | Oas2Definition;
export declare function checkIfRulesetExist(rules: typeof Config.prototype.rules): void;
export declare function cleanColors(input: string): string;
export declare function formatPath(path: string): string;
export declare function capitalize(s: string): string;
//# sourceMappingURL=miscellaneous.d.ts.map