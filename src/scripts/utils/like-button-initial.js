import RestaurantLiked from './local-db';

const LikeButton = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeBtnContainer = likeButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton();
    },
    async _renderButton() {
        const { id } = this._restaurant;

        if (await this.isRestaurantExists(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },
    async isRestaurantExists(id) {
        return RestaurantLiked.findRestaurant(id);
    },
    generateButtonLike() {
        return '<button class="button-circle" aria-label="like-restaurant" id="like"><i class="fa-regular fa-heart"></i></button>';
    },
    generateButtonLiked() {
        return '<button class="button-circle" aria-label="unlike-restaurant" id="like"><i class="fa-solid fa-heart"></i></button>';
    },
    _renderLike() {
        this._likeBtnContainer.innerHTML = this.generateButtonLike();

        const btnLike = document.querySelector('#like');

        btnLike.addEventListener('click', async () => {
            await RestaurantLiked.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },
    _renderLiked() {
        this._likeBtnContainer.innerHTML = this.generateButtonLiked();

        const btnLike = document.querySelector('#like');

        btnLike.addEventListener('click', async () => {
            await RestaurantLiked.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButton;
