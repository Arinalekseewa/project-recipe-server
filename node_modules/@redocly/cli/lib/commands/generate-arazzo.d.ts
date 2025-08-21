import { type CommandArgs } from '../wrapper.js';
export type GenerateArazzoCommandArgv = {
    descriptionPath: string;
    'output-file'?: string;
    config?: string;
};
export declare function handleGenerateArazzo({ argv, config, version, collectSpecData, }: CommandArgs<GenerateArazzoCommandArgv>): Promise<void>;
//# sourceMappingURL=generate-arazzo.d.ts.map