import $ from 'jquery';
import Api from '../../data/api';

const Dashboard = {
    async render() {
        return `
            <!--HOME-->
            <section class="home" id="home">
                <div class="picture">
                    <picture>
                        <source media="(max-width: 600px)" srcset="./images/hero-image_4-small.jpg">
                        <img class="lazyload" data-src="./images/hero-image_4-small.jpg" width="100%" alt="hero"/>
                    </picture>
                    <div class="filter"></div>
                </div>
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
                    <picture>
                        <source media="(max-width: 600px)" srcset="./images/fastfood-small.jpg">
                        <img class="lazyload" data-src="/images/fastfood-large.jpg" width="100%" alt="Makanan cepat saji - FastFood"/>
                    </picture>
                    <h2>FastFood</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <picture>
                    <source media="(max-width: 600px)" srcset="./images/seafood-small.jpg">
                    <img class="lazyload" data-src="/images/seafood-large.jpg" width="100%" alt="Makanan laut - SeaFood"/>
                </picture>
                <h2>SeaFood</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <picture>
                    <source media="(max-width: 600px)" srcset="./images/noodle-small.jpg">
                    <img class="lazyload" data-src="/images/noodle-large.jpg" width="100%" alt="Foto Noodle"/>
                </picture>
                <h2>Noodle</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est nobis reiciendis sit veniam necessitatibus earum.</p>
                </div>
                <div class="box">
                <picture>
                    <source media="(max-width: 600px)" srcset="./images/steak-small.jpg">
                    <img class="lazyload" data-src="/images/steak-large.jpg" width="100%" alt="Foto Steak"/>
                </picture>
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
                <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/small/${element.pictureId}" alt="Foto ${element.name}">
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
