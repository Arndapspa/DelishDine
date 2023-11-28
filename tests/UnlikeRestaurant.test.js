import RestaurantLiked from "../src/scripts/utils/local-db";
import LikeButton from "../src/scripts/utils/like-button-initial";

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div class="favorite-detail"></div>';
  };
  
  beforeEach(async () => {
    addLikeButtonContainer();
    await RestaurantLiked.putRestaurant({ id: 1 });
  });
  
  afterEach(async () => {
    await RestaurantLiked.deleteRestaurant(1);
  });
  
  it('should display unlike widget when the restaurant has been liked', async () => {
    await LikeButton.init({
      likeButtonContainer: document.querySelector('.favorite-detail'),
      restaurant: {id: 1},
    });
 
    expect(document.querySelector('[aria-label="unlike-restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await LikeButton.init({
      likeButtonContainer: document.querySelector('.favorite-detail'),
      restaurant: {id: 1},
    });
 
    expect(document.querySelector('[aria-label="like-restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButton.init({
      likeButtonContainer: document.querySelector('.favorite-detail'),
      restaurant: {id: 1},
    });
    document.querySelector('[aria-label="unlike-restaurant"]').dispatchEvent(new Event('click'));
    expect(await RestaurantLiked.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await LikeButton.init({
      likeButtonContainer: document.querySelector('.favorite-detail'),
      restaurant: {id: 1},
    });
    // Hapus dulu restaurant dari daftar restaurant yang disukai
    await RestaurantLiked.deleteRestaurant(1);
    // Kemudian, simulasikan pengguna menekan widget batal menyukai restaurant
    document.querySelector('[aria-label="unlike-restaurant"]').dispatchEvent(new Event('click'));
    expect(await RestaurantLiked.getAllRestaurant()).toEqual([]);
  });
});