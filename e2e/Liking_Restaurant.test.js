Feature('Liking Restaurant');
const assert = require('assert');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
    I.seeElement('.restaurant-container');
    I.see('Belum ada restaurant favoritmu', '.empty-container');
});

Scenario('liking one restaurant', async({ I }) => {
    I.see('Belum ada restaurant favoritmu', '.empty-container');
    I.amOnPage('/');
    
    I.seeElement('.cafe-container a');
    const firstRestaurant = locate('.cafe-container a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#like');
    I.click('#like');
    
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-container');
    
    const likedMovieTitle = await I.grabTextFrom('.restaurant-container a');
    assert.strictEqual(firstRestaurantTitle, likedMovieTitle);
});

Scenario('unliking one restaurant', async({ I }) => {
    I.see('Belum ada restaurant favoritmu', '.empty-container');
    I.amOnPage('/');
    
    I.seeElement('.cafe-container a');
    const firstRestaurant = locate('.cafe-container a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#like');
    I.click('#like');
    
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-container');
    
    const likedMovieTitle = await I.grabTextFrom('.restaurant-container a');
    assert.strictEqual(firstRestaurantTitle, likedMovieTitle);
    
    I.amOnPage('/#/favorite');
    
    I.seeElement('.restaurant-container a');
    const firstRestaurantLiked = locate('.restaurant-container a').first();
    I.click(firstRestaurantLiked);

    I.seeElement('#like');
    I.click('#like');
    
    I.amOnPage('/#/favorite');
    I.see('Belum ada restaurant favoritmu', '.empty-container');
});