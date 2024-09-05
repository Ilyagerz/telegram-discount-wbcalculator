import './App.css';
import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  const [currentPrice, setCurrentPrice] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [discount, setDiscount] = useState(null);
  const [adjustedPrice, setAdjustedPrice] = useState(null);

  useEffect(() => {
    WebApp.ready();
  }, []);

  const calculateDiscount = () => {
    if (currentPrice && desiredPrice) {
      const current = parseFloat(currentPrice);
      const desired = parseFloat(desiredPrice);
      const discountPercentage = ((current - desired) / current) * 100;
      setDiscount(Math.round(discountPercentage));
      setAdjustedPrice(null);
    }
  };

  const adjustCurrentPrice = () => {
    if (currentPrice && desiredPrice && discount) {
      const desired = parseFloat(desiredPrice);
      const adjustedCurrent = desired / (1 - discount / 100);
      setAdjustedPrice(adjustedCurrent.toFixed(2));
      setCurrentPrice(adjustedCurrent.toFixed(2));
    }
  };

  const resetCalculator = () => {
    setCurrentPrice('');
    setDesiredPrice('');
    setDiscount(null);
    setAdjustedPrice(null);
  };

  return (
    <div className="App">
      <h1>Калькулятор скидок WB</h1>
      <div>
        <label>
          Текущая цена:
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Желаемая цена:
          <input
            type="number"
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateDiscount}>Рассчитать %</button>
      {discount !== null && (
        <div>
          <p>Скидка: {discount}%</p>
          <button onClick={adjustCurrentPrice}>Скорректировать текущую цену</button>
        </div>
      )}
      {adjustedPrice !== null && (
        <p>Скорректированная текущая цена: {adjustedPrice}</p>
      )}
      <button onClick={resetCalculator}>Сбросить</button>
    </div>
  );
}

export default App;