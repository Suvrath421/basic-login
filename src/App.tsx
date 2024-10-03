import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buttons, setButtons] = useState<{ top: string; left: string; isReal: boolean }[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && password) {
      setIsLoggedIn(true);
    }
  };

  const generateRandomPosition = () => {
    const top = `${Math.random() * 90 + 20}%`; // Random top position between 10% and 90%
    const left = `${Math.random() * 90 + 20}%`; // Random left position between 10% and 90%
    return { top, left };
  };

  const generateButtons = (inputLength: number) => {
    const newButtons = [];
    const randomIndex = Math.floor(Math.random() * inputLength); // Randomly choose the real button

    for (let i = 0; i < inputLength; i++) {
      const buttonPosition = generateRandomPosition();
      newButtons.push({ ...buttonPosition, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition2 = generateRandomPosition();
      newButtons.push({ ...buttonPosition2, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition3 = generateRandomPosition();
      newButtons.push({ ...buttonPosition3, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition4 = generateRandomPosition();
      newButtons.push({ ...buttonPosition4, isReal: i === randomIndex }); // Only one button is real

      const buttonPosition5 = generateRandomPosition();
      newButtons.push({ ...buttonPosition5, isReal: i === randomIndex }); // Only one button is real
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
      // If a decoy button is clicked, randomize the buttons again
      generateButtons(name.length || password.length);
    }
  };

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
                  backgroundColor: 'gray', // Make all buttons look the same
                }}
              >
                Button {index + 1}
              </button>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
