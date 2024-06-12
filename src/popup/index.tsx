import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import './global.less';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffc53d',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
