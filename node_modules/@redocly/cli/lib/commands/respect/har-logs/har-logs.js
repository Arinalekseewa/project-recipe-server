export function createHarLog({ entries = [], pageInfo = {}, version, } = {
    entries: [],
    pageInfo: {},
    version: undefined,
}) {
    return {
        log: {
            version: '1.2',
            creator: {
                name: '@redocly/respect-core',
                version: version,
            },
            pages: [
                Object.assign({
                    startedDateTime: new Date().toISOString(),
                    id: 'page_1',
                    title: 'Page',
                    pageTimings: {
                        onContentLoad: -1,
                        onLoad: -1,
                    },
                }, pageInfo),
            ],
            entries,
        },
    };
}
//# sourceMappingURL=har-logs.js.map