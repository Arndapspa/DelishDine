import {
    openDB,
} from 'idb';

const DATABASE_NAME = 'delish-dine';
    const DATABASE_VERSION = '1';
    const OBJECT_STORE_NAME = 'restaurant';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, {
            keyPath: 'id',
        });
    },
});

const RestaurantLiked = {
    async findRestaurant(id) {
        if (!id) return [];
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },
    async getAllRestaurant() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putRestaurant(movie) {
        if (!movie) return false;
        return (await dbPromise).put(OBJECT_STORE_NAME, movie);
    },
    async deleteRestaurant(id) {
        if (!id) return false;
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },
};

export default RestaurantLiked;
