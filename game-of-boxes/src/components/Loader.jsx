import React from 'react';
import '../styles/home.css'; 

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <svg className="loader-svg" width="45" height="45" viewBox="0 0 24 24" fill="none">
        <circle opacity="0.2" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path opacity="0.8" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    </div>
  );
}