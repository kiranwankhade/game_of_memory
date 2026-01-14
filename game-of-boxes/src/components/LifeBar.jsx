import { FaHeart } from "react-icons/fa";

export default function LifeBar({ lives }) {
  return (
    <div className="d-flex gap-2 align-items-center mb-4">
      <span className="fw-bold me-2" style={{ color: 'var(--text)' }}>LIVES:</span>
      {[...Array(3)].map((_, i) => (
        <FaHeart 
          key={i} 
          size={24} 
          color={i < lives ? "var(--primary)" : "rgba(128,128,128,0.3)"} 
          style={{ transition: 'all 0.3s ease' }}
        />
      ))}
    </div>
  );
}