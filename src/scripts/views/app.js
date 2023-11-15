import $ from 'jquery';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ content }) {
        this._content = content;
        this._eventScrolling = function scroll() {
            if ($(this).scrollTop() > $('#home').height()) {
                $('.header').addClass('header-colored');
            } else {
                $('.header').removeClass('header-colored');
            }
        };
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];
        this._content.innerHTML = await page.render();

        if (url === '/') {
            $(window).on('scroll', this._eventScrolling);
        } else {
            $(window).unbind('scroll');
        }

        await page.afterRender();

            const skipLinkElem = document.querySelector('.skip-to-content');
            skipLinkElem.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector('#content').focus();
            });
            }
        }

        export default App;
