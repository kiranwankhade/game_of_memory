export const generatePattern = (level, totalBoxes) => {
    const count = Math.min(3 + level, totalBoxes / 2);
    const set = new Set();

    while(set.size < count) {
        set.add(Math.floor(Math.random() * totalBoxes));
    }

    return [...set];
}


export const getTimeLimit = (level) => {
    if (level < 4) return 15;   // easy
    if (level < 7) return 20;   // medium
    return 25;                 // hard
  };