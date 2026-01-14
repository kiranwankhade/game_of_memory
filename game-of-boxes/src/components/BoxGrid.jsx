import "../styles/box.css";

const BoxGrid = ({ pattern, userClicks, errorIndex, onClick, show, level }) => {
  let cols = 4;
  let total = 20;

  if (level >= 4 && level < 7) { cols = 5; total = 30; } 
  else if (level >= 7) { cols = 6; total = 42; }

  return (
    <div 
      className="game-grid-main" 
      style={{ 
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        maxWidth: cols * 75 + 'px' 
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isPattern = pattern.includes(i);
        const isClicked = userClicks.includes(i);
        const isError = errorIndex === i;

        let boxClass = "game-box";
        if (show && isPattern) boxClass += " box-flash";
        if (!show && isClicked) boxClass += " box-correct";
        if (!show && isError) boxClass += " box-wrong";

        return (
          <div 
            key={i} 
            className={boxClass} 
            onClick={() => onClick(i)}
          />
        );
      })}
    </div>
  );
};

export default BoxGrid;