import React from 'react';
import "../styles/home.css"

const sizeMap = {
  xs:'30px',
  sm: "60px",
  md: "100px",
  lg: "140px",
};

export function GameLogo({ className, size = "md" }) {
  const dimension = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={`game-logo-container ${className}`} 
      style={{ width: dimension, height: dimension }}
    >
      <svg viewBox="0 0 100 100" className="w-100 h-100">
        {/* Top Left - Primary */}
        <rect x="5" y="5" width="40" height="40" rx="10" fill="var(--primary)" fillOpacity="0.9" />
        
        {/* Top Right - Secondary (using primary with lower opacity if secondary isn't defined) */}
        <rect x="55" y="5" width="40" height="40" rx="10" fill="var(--primary)" fillOpacity="0.4" />
        
        {/* Bottom Left - Pink accent */}
        <rect x="5" y="55" width="40" height="40" rx="10" fill="#ff477e" />
        
        {/* Bottom Right - Green accent */}
        <rect x="55" y="55" width="40" height="40" rx="10" fill="#06d6a0" />
        
        {/* Center Glow */}
        <circle cx="50" cy="50" r="12" fill="white" className="logo-center-dot" />
      </svg>
    </div>
  );
}