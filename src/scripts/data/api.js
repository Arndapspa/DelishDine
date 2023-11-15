const baseUrl = 'https://restaurant-api.dicoding.dev/';
class Api {
    static async getListRestaurant() {
        const response = await fetch(`${baseUrl}list`);
        const dataJson = await response.json();

        return dataJson;
    }

    static async getDetailRestaurant(id) {
        const response = await fetch(`${baseUrl}detail/${id}`);
        const dataJson = await response.json();

        return dataJson;
    }
}

export default Api;
