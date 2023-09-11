import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('it renders the app header', () => {
  render(<App />);

  const headerElement = screen.getByText('Welcome to My App');
  expect(headerElement).toBeInTheDocument();
});

test('it allows clicking a button', () => {
  render(<App />);

  const buttonElement = screen.getByText('Click Me');
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);

  const updatedTextElement = screen.getByText('Text Updated');
  expect(updatedTextElement).toBeInTheDocument();
});

