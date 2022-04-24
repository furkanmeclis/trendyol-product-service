import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
const element = document.querySelector('trendyol-new-product-service');
if (element) {
  ReactDOM.render(
    <App
      apiKey={element.getAttribute('api-key')}
      supplierId={element.getAttribute('supplier-id')}
    />,
    element
  );
}
