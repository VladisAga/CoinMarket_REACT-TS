import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux/configure-store.ts';
import MainPage from './pages/MainPage/MainPage.tsx';
import CoinPage from './pages/CoinPage/CoinPage.tsx';
import Layout from './Layout/HeaderAndMain/HeaderAndMain.tsx';
import Error from './pages/Error/Error.tsx';
import { routes } from './routes/routes.ts';

const router = createBrowserRouter([
  {
    path: routes.DEFAULT_PATH,
    element: <Layout />,
    children: [
      {
        path: routes.DEFAULT_PATH,
        element: <MainPage />
      },
      {
        path: routes.COINPAGE_PATH,
        element: <CoinPage />
      }
    ]
  },
  {
    path: routes.ERROR_PATH,
    element: <Error />
  },

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
