import React, { useState, useEffect } from 'react';

const Background = () => {
  const [squares, setSquares] = useState([]);

  // Function to create moving squares with random movement directions
  const createSquares = () => {
    const numSquares = 15;
    const newSquares = [];
    for (let i = 0; i < numSquares; i++) {
      // Randomize direction for each square (both positive and negative)
      const randomX = (Math.random() * 40 - 20); // Random horizontal movement (-20vw to 20vw)
      const randomY = (Math.random() * 40 - 20); // Random vertical movement (-20vh to 20vh)
      const randomDuration = Math.random() * 15 + 10; // Random animation duration between 10s and 25s
      const randomDelay = Math.random() * 5; // Random animation delay

      newSquares.push({
        id: i,
        top: `${Math.random() * 100}vh`, // Random initial Y position
        left: `${Math.random() * 100}vw`, // Random initial X position
        xMove: randomX, // Store random horizontal movement
        yMove: randomY, // Store random vertical movement
        animationDuration: `${randomDuration}s`,
        animationDelay: `${randomDelay}s`,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
      });
    }
    setSquares(newSquares);
  };

  useEffect(() => {
    createSquares();
  }, []);
  
  useEffect(() => {
    // Inject custom keyframes for random square movements
    squares.forEach((square) => {
      const styleSheet = document.styleSheets[0];
      const keyframes = `
        @keyframes moveSquare-${square.id} {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${square.xMove}vw, ${square.yMove}vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
  }, [squares]);
  
  return (
    <div id="square-container" className="w-absolute h-absolute z-0 top-0 left-0">
      {squares.map((square) => (
        <div
          key={square.id}
          className="square"
          style={{
            top: square.top,
            left: square.left,
            animationDelay: square.animationDelay,
            backgroundColor: square.backgroundColor,
            animationDuration: square.animationDuration, // Randomize animation duration
            animationName: `moveSquare-${square.id}`, // Unique class name per square
          }}
        ></div>
      ))}
    </div>
  );
};

export default Background;
