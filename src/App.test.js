import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const loginTitle = screen.getByText(/login/i);
  expect(loginTitle).toBeInTheDocument();
});

test('renders email input', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/e-mail/i);
  expect(emailInput).toBeInTheDocument();
});

test('renders password input', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText(/senha/i);
  expect(passwordInput).toBeInTheDocument();
});

test('renders login button', () => {
  render(<App />);
  const loginButton = screen.getByText(/acessar/i);
  expect(loginButton).toBeInTheDocument();
});
