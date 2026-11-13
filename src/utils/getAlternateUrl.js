export function getAlternateUrl(language, fallback = '/') {
    if (typeof document === 'undefined') {
        return fallback;
    }

    const link = document.querySelector(
        `link[rel="alternate"][hreflang="${language}"]`
    );

    return link?.href ?? fallback;
}
