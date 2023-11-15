import Dashboard from '../views/pages/dashboard';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': Dashboard,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
