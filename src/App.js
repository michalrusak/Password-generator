import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const letters = 'abcdefghijklmnoprstuvwxyz';
  const numbers = '0123456789';
  const specialSigns = '!@#$%&';

  const [password, setPassword] = useState('');

  const [form, setForm] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialsigns: false,
    length: 8,
  });

  const handleSignsChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    setForm((prevValue) => {
      return {
        ...prevValue,
        [name]: checked,
      };
    });
  };
  const handleLengthChange = (e) => {
    const value = e.target.value;

    if (value < 1) {
      setForm((prevValue) => {
        return {
          ...prevValue,
          length: 1,
        };
      });
      return;
    }

    setForm((prevValue) => {
      return {
        ...prevValue,
        length: value,
      };
    });
  };

  const generatePassword = (e) => {
    e.preventDefault();

    let text = '';

    if (form.lowercase === true) {
      text += letters;
    }
    if (form.uppercase === true) {
      text += letters.toUpperCase();
    }
    if (form.numbers === true) {
      text += numbers;
    }
    if (form.specialsigns === true) {
      text += specialSigns;
    }

    if (text.length === 0) {
      alert('Check the form!');
      return;
    }

    let password = '';

    for (let i = 0; i < form.length; i++) {
      const index = Math.floor(Math.random() * text.length);
      password += text[index];
    }

    setPassword(password);
  };

  const copyPasswordtoClipboard = () => {
    navigator.clipboard?.writeText && navigator.clipboard.writeText(password);
  };

  return (
    <div className="App">
      <div className="box">
        <h1 className="title">Password generator</h1>
        <form className="form" onSubmit={generatePassword}>
          <label htmlFor="lowercase">
            lowercase:
            <input
              className="checkbox"
              type="checkbox"
              name="lowercase"
              id="lowercase"
              onChange={handleSignsChange}
            />
          </label>
          <label htmlFor="uppercase">
            uppercase:
            <input
              className="checkbox"
              type="checkbox"
              name="uppercase"
              id="uppercase"
              onChange={handleSignsChange}
            />
          </label>
          <label htmlFor="numbers">
            numbers:
            <input
              className="checkbox"
              type="checkbox"
              name="numbers"
              id="numbers"
              onChange={handleSignsChange}
            />
          </label>
          <label htmlFor="specialsigns">
            specialsigns:
            <input
              className="checkbox"
              type="checkbox"
              name="specialsigns"
              id="specialsigns"
              onChange={handleSignsChange}
            />
          </label>
          <div className="lengthChange">
            <label htmlFor="length">
              length:
              <input
                type="number"
                name="length"
                id="length"
                min={1}
                onChange={handleLengthChange}
                value={form.length}
              />
            </label>
            <label htmlFor="range">
              <input
                className="range"
                type="range"
                name="range"
                id="range"
                min={1}
                onChange={handleLengthChange}
                value={form.length}
              />
            </label>
          </div>
          <input
            className="button submitButton"
            type="submit"
            value="Generate"
          />
        </form>
        <div className="password">
          {password ? password : <p>Generate your password!</p>}
        </div>
        <button
          className={`button copyButton ${password ? '' : 'hidden'}`}
          onClick={copyPasswordtoClipboard}
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default App;
