import $ from 'jquery';
import Api from '../../data/api';

const Dashboard = {
    async render() {
        return `
            <!--HOME-->
            <section class="home" id="home">
            <div class="home-content">
                <h2>DelishDine</h2>
                <h3>Indonesian Restaurant Reference <br> Explore different types of Indonesian Restaurant  </h3>
            </div>
            </section>
        
        <!--CATEGORY-->
            <section class="category" id="category">
            <div class="heading">
                <h1>Explore The Kind of Food You Want <br><span>Food Category</span></h1>
                <a href="#" class="btn">See All<i class="fa-solid fa-arrow-right"></i></i></a>
            </div>
        
            <div class="category-container">
                <div class="box">
                    <img src="./images/heros/fastfood.jpg" alt="Makanan cepat saji - FastFood">
                    <h2>FastFood</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <img src="./images/heros/seafood.jpg" alt="Makanan laut - SeaFood">
                <h2>SeaFood</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <img src="./images/heros/noodle.jpg" alt="Foto Noodle">
                <h2>Noodle</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <img src="./images/heros/steak.jpg"  alt="Foto Steak">
                <h2>Steak</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
            </section>
        
            <!--CAFE-->
            <section class="cafe" id="cafe"></section>
        
            <!--RESTAURANT-->
            <section class="restaurant" id="restaurant"></section>`;
    },
    async afterRender() {
        this.getDataRestaurant('cafe', 'Browse Our Popular Cafe', 'Cafe Catalog', 6);
        this.getDataRestaurant('restaurant', 'Choose Our Best Restaurant', 'Restaurant Catalog', 6, 'reverse');

        const header = document.getElementsByClassName('header');
        header[0].classList.remove('header-colored');
    },
    async getDataRestaurant(id, title, subtitle, limit, order = 'normal') {
        let listRestaurant = '';
        const dataRestaurant = await Api.getListRestaurant();

        if (dataRestaurant.error) return;

        if (order === 'reverse') {
            dataRestaurant.restaurants.reverse();
        }

        let number = 0;
        for (const element of dataRestaurant.restaurants) {
            if (limit === number) break;

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
            number += 1;
        }

        const template = `<div class="heading">
        <h1>${title} <br><span>${subtitle}</span></h1>
        <a href="#" class="btn">See All<i class="fa-solid fa-arrow-right"></i></i></a>
        </div>
    
        <div class="${id}-container">
        ${listRestaurant}
        </div>`;
        $(`#${id}`).html(template);
    },
};

export default Dashboard;
