import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ children }) {
  return (
    <div className="home-app">
      <div className="page-container">{children}</div>
      <div> </div>
    </div>
  );
}
