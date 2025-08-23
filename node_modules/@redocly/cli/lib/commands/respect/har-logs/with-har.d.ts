import { type fetch } from 'undici';
export interface WithHar {
    <T extends typeof fetch>(baseFetch: T, defaults?: any): T;
    harEntryMap?: Map<string, any>;
}
export declare const withHar: WithHar;
//# sourceMappingURL=with-har.d.ts.map