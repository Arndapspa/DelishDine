import $ from 'jquery';
import RestaurantLiked from '../../utils/local-db';

const Favorite = {
    async render() {
        return `<div class="favorited-restaurant">
        <section class="restaurant" id="restaurant"></section>
        </div>`;
    },
    async afterRender() {
        const header = document.getElementsByClassName('header');
        header[0].classList.add('header-colored');

        await this.getDataRestaurant();
    },
    async getDataRestaurant() {
        let listRestaurant = '';
        const dataRestaurant = await RestaurantLiked.getAllRestaurant();

        if (dataRestaurant.error) return;

        for (const element of dataRestaurant) {
            listRestaurant += `
            <div class="box">
                <img src="https://restaurant-api.dicoding.dev/images/small/${element.pictureId}" alt="Foto ${element.name}">
                <a href="#/detail/${element.id}">${element.name}</a>
                <div class="information">
                <div>
                    <i class="fa-solid fa-location-dot"><span> ${element.city} </span></i>
                </div>
                <div class="text-warning">
                    <i class="fa-solid fa-star"><span class="text-warning"> ${element.rating} </span></i>
                </div>
                </div>
                <p>${element.description}</p>
            </div>`;
        }

        const template = `<div class="heading">
        <h1>Favorite <br><span>Restaurant</span></h1>
        </div>
    
        <div class="restaurant-container">
        ${listRestaurant}
        </div>`;
        $('#restaurant').html(template);
    },
};

export default Favorite;
