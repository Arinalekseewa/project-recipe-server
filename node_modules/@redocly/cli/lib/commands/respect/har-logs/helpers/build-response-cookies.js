import * as setCookie from 'set-cookie-parser';
export function buildResponseCookies(headers) {
    const cookies = [];
    // Handle both plain objects and Headers instance
    const setCookies = headers instanceof Headers
        ? headers.getSetCookie() // For Headers object
        : headers['set-cookie']; // For plain objects
    if (setCookies) {
        for (const headerValue of setCookies) {
            let parsed;
            try {
                parsed = setCookie.parse(headerValue);
            }
            catch {
                continue;
            }
            for (const cookie of parsed) {
                const { name, value, path, domain, expires, httpOnly, secure } = cookie;
                const harCookie = {
                    name,
                    value,
                    httpOnly: httpOnly || false,
                    secure: secure || false,
                };
                if (path) {
                    harCookie.path = path;
                }
                if (domain) {
                    harCookie.domain = domain;
                }
                if (expires) {
                    harCookie.expires = expires.toISOString();
                }
                cookies.push(harCookie);
            }
        }
    }
    return cookies;
}
//# sourceMappingURL=build-response-cookies.js.map