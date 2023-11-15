import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/detail.css';

import $ from 'jquery';
import App from './views/app';

import swRegister from './utils/sw-register';

const app = new App({
  content: document.querySelector('#content'),
});

function toggleMenu() {
  $('#menu-icon').toggleClass('open');
  $('#navbar').toggleClass('active');
}

function hideMenu() {
  $('#menu-icon').removeClass('open');
  $('#navbar').removeClass('active');
}

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();

  $(document).ready(() => {
    $('#menu-icon').click((event) => {
      event.stopPropagation();
      toggleMenu();
    });
    $('body').click((event) => {
      event.stopPropagation();
      hideMenu();
    });
  });
});
