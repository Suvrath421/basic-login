import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buttons, setButtons] = useState<{ top: string; left: string; isReal: boolean }[]>([]);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showFloatingImage, setShowFloatingImage] = useState(false);
  const [imagePosition, setImagePosition] = useState<{ top: string; left: string }>({
    top: '50%',
    left: '50%',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const generateRandomPosition = () => {
    const top = `${Math.random() * 80 + 10}%`; // Random top position between 10% and 90%
    const left = `${Math.random() * 80 + 10}%`; // Random left position between 10% and 90%
    return { top, left };
  };

  const generateButtons = (inputLength: number) => {
    const newButtons = [];
    const randomIndex = Math.floor(Math.random() * inputLength); // Randomly choose the real button

    for (let i = 0; i < inputLength; i++) {
      const buttonPosition = generateRandomPosition();
      newButtons.push({ ...buttonPosition, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition1 = generateRandomPosition();
      newButtons.push({ ...buttonPosition1, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition2 = generateRandomPosition();
      newButtons.push({ ...buttonPosition2, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition3 = generateRandomPosition();
      newButtons.push({ ...buttonPosition3, isReal: i === randomIndex }); // Only one button is real
    }

    setButtons(newButtons);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setName(input);
    generateButtons(input.length); // Create a button for each letter
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);
    generateButtons(input.length); // Create a button for each letter
  };

  const handleButtonClick = (isReal: boolean) => {
    if (!isReal) {
      setFailedAttempts(failedAttempts + 1); // Increase failed attempts
      if (failedAttempts + 1 >= 3) {
        setShowFloatingImage(true); // Show floating image after 3 failed attempts
      } else {
        generateButtons(name.length || password.length); // Randomize buttons again
      }
    }
  };

  const handleImageClick = () => {
    // When the floating image is clicked, hide the image and bring back the buttons
    setShowFloatingImage(false);
    setFailedAttempts(0); // Reset failed attempts
    setTimeout(() => {
      // Ensure buttons are generated again after the image is hidden
      generateButtons(name.length || password.length);
    }, 100); // Allow state to update before regenerating buttons
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showFloatingImage) {
      interval = setInterval(() => {
        setImagePosition(generateRandomPosition());
      }, 200); // Move the image every 200ms
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showFloatingImage]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <h1>Welcome, {name}! You have successfully logged in.</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Show buttons if image is not visible, else show the "Catch me if you can" message */}
          {!showFloatingImage ? (
            <div style={{ position: 'relative', height: '300px', width: '100%' }}>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  type={button.isReal ? 'submit' : 'button'}
                  onClick={() => handleButtonClick(button.isReal)} // Handle button click
                  style={{
                    position: 'absolute',
                    top: button.top,
                    left: button.left,
                    backgroundColor: 'pink', // Make all buttons look the same
                  }}
                >
                  Button {index + 1}
                </button>
              ))}
            </div>
          ) : (
            <h2>Catch me if you can!</h2>
          )}

          {/* Floating image after 3 failed attempts */}
          {showFloatingImage && (
            <img
              src="https://avatars.githubusercontent.com/u/77300333?v=4" // Replace with actual image URL
              alt="Floating"
              onClick={handleImageClick} // Bring back the buttons when the image is clicked
              style={{
                position: 'absolute',
                top: imagePosition.top,
                left: imagePosition.left,
                width: '90px',
                height: '90px',
                cursor: 'pointer',
              }}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default App;
