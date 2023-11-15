import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const apiResturant = new Route(
    ({
        url,
    }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
    new StaleWhileRevalidate({
        cacheName: 'restaurant-api-endpoint',
    }),
);

registerRoute(apiResturant);

self.addEventListener('install', () => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});
