import $ from 'jquery';
import avatar from '../../../public/images/avatar.png';
import Api from '../../data/api';
import UrlParser from '../../routes/url-parser';
import RestaurantLiked from '../../utils/local-db';

const Detail = {
    async render() {
        return ' <div class="content-detail"></div>';
    },
    async afterRender() {
      const header = document.getElementsByClassName('header');
      header[0].classList.add('header-colored');
      const url = UrlParser.parseActiveUrlWithoutCombiner();

      const fetchDetail = await Api.getDetailRestaurant(url.id);
      if (fetchDetail.error) {
        return 'Data tidak ditemukan';
      }

      const detail = fetchDetail.restaurant;
      const tmpDetailData = await this.fetchDetailRestaurant(detail);

      $('.content-detail').html(tmpDetailData);

      await this.toggleBtnFavorite(detail);

      return true;
    },
    async fetchDetailRestaurant(detail) {
      let listCategories = '';

      detail.categories.forEach((element) => {
        listCategories += `<div class="box">${element.name}</div>`;
      });

      let listFoods = '';

      detail.menus.foods.forEach((element) => {
        listFoods += `
        <div class="box">
            <div > ${element.name} </div>
        </div>`;
      });

      let listDrinks = '';

      detail.menus.drinks.forEach((element) => {
        listDrinks += `
        <div class="box">
            <div > ${element.name} </div>
        </div>`;
      });

      let listReviews = '';

      detail.customerReviews.forEach((element) => {
        listReviews += `
        <div class="box">
          <i class="fa-solid fa-quote-left"></i>
          <div class="rating-cust">
            <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <p>${element.review}</p>
            <div class="review-profile">
              <img src="${avatar}" alt="Foto user">
              <div class="profile-detail">
                <h3>${element.name}</h3>
                <div class="date">${element.date}</div>
              </div>
            </div>
          </div>
        </div>`;
      });

      return `
      
        <a href="/" class="btn-back"><i class="fa-solid fa-arrow-left"></i>Back To Home</a>
      <div class="detail-resto">
          <img src="https://restaurant-api.dicoding.dev/images/medium/${detail.pictureId}" alt="Foto ${detail.name}">
      </div>
      <div class="cate-fav">
        <div class="categories">
        ${listCategories}
        </div>
        <div class="favorite-detail">
          <button class="button-circle" id="favorite"></button>
        </div>
      </div>
      <div class="detail-content">
          <h1 class="name">${detail.name}</h1>
          <div class="detail-desc">
            <div>
              <div id="city">${detail.city}</div>
              <div id="address">${detail.address}</div>
            </div>
            <div id="rating"><i class="fa-solid fa-star"></i> ${detail.rating} </div>  
          </div>
      </div> 
      <!--<a href="#/" class="btn-back"><i class="fa-solid fa-arrow-left"></i>Back To Home</a>-->
      
      <div class="description">
         <h2>Description</h2>
          <p>${detail.description}</p>
      </div>
    
      <div class="menu">
        <h2>Our Menu</h2>
        <div class="heading">
          <span><i class="fa-solid fa-bowl-rice"></i> Food </span>  
            <a href="#" class="btn">See All<i class='fa-solid fa-arrow-right'></i></a>
        </div>
              <div class="food-menu">
                <div class="food">
                ${listFoods}
                </div>
              </div>

          <div class="heading">
              <span><i class="fa-solid fa-champagne-glasses"></i> Drinks </span>  
              <a href="#" class="btn">See All<i class="fa-solid fa-arrow-right"></i></a> 
          </div>
              <div class="drink-menu">
                <div class="drink">
                ${listDrinks}
                </div>
              </div>
      </div>
  
      <div class="customers" id="customers">
          <h2>Customers Review</h2>
          <div class="customers-review">
          ${listReviews}
          </div>
      </div>`;
    },
    async toggleBtnFavorite(dataRetaurant) {
      const checkRestaurantLiked = await RestaurantLiked.findRestaurant(dataRetaurant.id);

      const isFavorited = checkRestaurantLiked != null;
      if (isFavorited) {
        $('#favorite').html('<i class="fa-solid fa-heart"></i>');
        $('#favorite').addClass('active');
        $('#favorite').click(async () => {
          await RestaurantLiked.deleteRestaurant(dataRetaurant.id);
          $('#favorite').html('<i class="fa-regular fa-heart"></i>');
          $('#favorite').removeClass('active');
        });
      } else {
        $('#favorite').html('<i class="fa-regular fa-heart"></i>');
        $('#favorite').removeClass('active');
        $('#favorite').click(async () => {
          await RestaurantLiked.pustRestaurant(dataRetaurant);
          $('#favorite').html('<i class="fa-solid fa-heart"></i>');
          $('#favorite').addClass('active');
        });
      }
    },
};

export default Detail;
