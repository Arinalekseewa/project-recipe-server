export type FetchWithTimeoutOptions = RequestInit & {
    timeout?: number;
};
declare const _default: (url: string, { timeout, ...options }?: FetchWithTimeoutOptions) => Promise<Response>;
export default _default;
//# sourceMappingURL=fetch-with-timeout.d.ts.map