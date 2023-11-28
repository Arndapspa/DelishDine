import $ from 'jquery';
import avatar from '../../../public/images/avatar.png';
import Api from '../../data/api';
import UrlParser from '../../routes/url-parser';
import LikeButton from '../../utils/like-button-initial';

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

      LikeButton.init({
        likeButtonContainer: document.querySelector('.favorite-detail'),
        restaurant: detail,
      });
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
              <img class="lazyload" data-src="${avatar}" alt="Foto user" width="44" height="44">
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
          <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/medium/${detail.pictureId}" alt="Foto ${detail.name}">
      </div>
      <div class="cate-fav">
        <div class="categories">
        ${listCategories}
        </div>
        <div class="favorite-detail"></div>
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
};

export default Detail;
