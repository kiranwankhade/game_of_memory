import React from "react";
import "../styles/home.css";

export default function Loader({ size = 70 }) {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div
        className="game-logo-color-loader"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" className="w-100 h-100">
          <rect x="5" y="5" width="40" height="40" rx="10" className="sq sq-1" />
          <rect x="55" y="5" width="40" height="40" rx="10" className="sq sq-2" />
          <rect x="5" y="55" width="40" height="40" rx="10" className="sq sq-3" />
          <rect x="55" y="55" width="40" height="40" rx="10" className="sq sq-4" />

          {/* Center dot */}
          <circle cx="50" cy="50" r="10" className="loader-center-dot" />
        </svg>
      </div>
    </div>
  );
}

