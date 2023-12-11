import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Champion from './pages/Champion';
import SingleChampion from './pages/SingleChampion';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/champion',
        element: <Champion />
      }, {
        path: '/champion/:championId',
        element: <SingleChampion />
      }, {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/login',
        element: <LogIn />
      }
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
