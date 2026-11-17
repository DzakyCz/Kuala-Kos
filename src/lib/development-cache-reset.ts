// The application does not register a service worker. Development may reuse an
// origin where an older /sw.js still controls requests for Next.js chunks.
export const resetLegacyWorker = `
(async () => {
    if (!('serviceWorker' in navigator)) return;
    const isLegacyWorker = (worker) => {
        if (!worker) return false;
        const url = new URL(worker.scriptURL);
        return url.origin === location.origin && url.pathname === '/sw.js';
    };
    const controlled = isLegacyWorker(navigator.serviceWorker.controller);
    const registrations = await navigator.serviceWorker.getRegistrations();
    const legacy = registrations.filter(registration =>
        isLegacyWorker(registration.active) ||
        isLegacyWorker(registration.waiting) ||
        isLegacyWorker(registration.installing)
    );
    if (!legacy.length && !controlled) return;
    await Promise.all(legacy.map(registration => registration.unregister()));
    if ('caches' in window) {
        for (const name of await caches.keys()) {
            const cache = await caches.open(name);
            for (const request of await cache.keys()) {
                const url = new URL(request.url);
                if (url.origin === location.origin && url.pathname.startsWith('/_next/')) {
                    await cache.delete(request);
                }
            }
        }
    }
    const key = 'kuala-kos:legacy-worker-reset';
    if (controlled && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        location.reload();
    }
})().catch(error => console.warn('Development cache reset failed:', error));
`;

