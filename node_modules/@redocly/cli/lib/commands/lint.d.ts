import type { Config, Exact, OutputFormat } from '@redocly/openapi-core';
import type { CommandArgv, VerifyConfigOptions } from '../types.js';
import type { CommandArgs } from '../wrapper.js';
export type LintArgv = {
    apis?: string[];
    'max-problems': number;
    extends?: string[];
    format: OutputFormat;
    'generate-ignore-file'?: boolean;
    'skip-rule'?: string[];
    'skip-preprocessor'?: string[];
} & VerifyConfigOptions;
export declare function handleLint({ argv, config, version, collectSpecData, }: CommandArgs<LintArgv>): Promise<void>;
export declare function handleLintConfig(argv: Exact<CommandArgv>, version: string, config: Config): Promise<void>;
//# sourceMappingURL=lint.d.ts.map