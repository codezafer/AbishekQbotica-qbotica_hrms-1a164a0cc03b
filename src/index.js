import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import Spinner from './components/Spinner';

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <Suspense fallbackElement={<Spinner />}>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
);

