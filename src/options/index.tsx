import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import './global.less';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { router } from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider
      router={createHashRouter([
        {
          path: '',
          element: <App />,
          children: router,
        },
      ])}
    />
  </React.StrictMode>
);
