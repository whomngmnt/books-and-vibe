import { createHashRouter } from 'react-router-dom';

import { AppLayout } from '../components/layout/AppLayout/AppLayout';

import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { CartPage } from '../pages/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';
import { RightsPage } from '../pages/RightsPage';
import { TeamPage } from '../pages/TeamPage';
import { ContactsPage } from '../pages/ContactsPage/ContactsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { OrderHistoryPage } from '../pages/OrderHistoryPage';
import { AuthCallbackPage } from '../pages/AuthCallbackPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'products/:slug',
        element: <ProductPage />,
      },
      {
        path: 'rights',
        element: <RightsPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'orders',
        element: <OrderHistoryPage />,
      },
      {
        path: 'auth/callback',
        element: <AuthCallbackPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
