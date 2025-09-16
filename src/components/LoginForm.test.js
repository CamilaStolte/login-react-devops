import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('LoginForm Additional Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('handles multiple login attempts', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    // First attempt - wrong credentials
    await userEvent.type(emailInput, 'wrong@email.com');
    await userEvent.type(passwordInput, 'wrong');
    await userEvent.click(loginButton);

    let errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();

    // Clear fields and try again with correct credentials
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, 'eduardo.lino@pucpr.br');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    const successMessage = screen.getByText(/acessado com sucesso!/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('is case sensitive for email validation', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'EDUARDO.LINO@PUCPR.BR');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates empty email field', async () => {
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates empty password field', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'eduardo.lino@pucpr.br');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates both empty fields', async () => {
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('applies correct CSS classes to error message', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'wrong@email.com');
    await userEvent.type(passwordInput, 'wrong');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error');
  });
});