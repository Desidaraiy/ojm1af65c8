
import HomePage from '../pages/home.f7.html';
import BalancePage from '../pages/balance.f7.html';
import SettingsPage from '../pages/settings.f7.html';
import SignupPage from '../pages/signup.f7.html';
import CodePage from '../pages/code.f7.html';

import NotFoundPage from '../pages/404.f7.html';

var routes = [
  {
    path: '/',
    component: HomePage,
    keepAlive: true,
  },
  {
    path: '/balance/',
    component: BalancePage,
    keepAlive: true,
  },
  {
    path: '/settings/',
    component: SettingsPage,
    keepAlive: true,
  },
  {
    path: '/signup/',
    component: SignupPage,
  },
  {
    path: '/code/',
    component: CodePage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;