import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux/configure-store.ts';
import MainPage from './pages/MainPage/MainPage.tsx';
import CoinPage from './pages/CoinPage/CoinPage.tsx';
import Layout from './Layout/HeaderAndMain/HeaderAndMain.tsx';
import Error from './pages/Error/Error.tsx';

const BASENAME = '/CoinMarket_REACT-TS/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <MainPage />
      },
      {
        path: '/coinPage/:inf',
        element: <CoinPage />
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  },
], {
  basename: BASENAME 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);