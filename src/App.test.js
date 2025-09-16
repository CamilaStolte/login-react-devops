import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component - Login Form', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders login form with all elements', () => {
    const loginTitle = screen.getByText(/login/i);
    expect(loginTitle).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /acessar/i });
    expect(loginButton).toBeInTheDocument();
  });


  test('shows success message with correct credentials', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'eduardo.lino@pucpr.br');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    const successMessage = screen.getByText(/acessado com sucesso!/i);
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).not.toHaveClass('error');
  });

  test('allows typing in email input', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows typing in password input', async () => {
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    
    await userEvent.type(passwordInput, 'testpassword');
    
    expect(passwordInput.value).toBe('testpassword');
  });

  test('shows error message with incorrect credentials', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'wrong@email.com');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error');
  });

  test('shows error message with correct email but wrong password', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'eduardo.lino@pucpr.br');
    await userEvent.type(passwordInput, 'wrongpassword');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error');
  });

  test('shows error message with wrong email but correct password', async () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /acessar/i });

    await userEvent.type(emailInput, 'wrong@email.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error');
  });

  test('does not show message initially', () => {
    const successMessage = screen.queryByText(/acessado com sucesso!/i);
    const errorMessage = screen.queryByText(/usuário ou senha incorretos!/i);
    
    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('input fields have correct types', () => {
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('login button triggers handleLogin function', () => {
    const loginButton = screen.getByRole('button', { name: /acessar/i });
    
    expect(loginButton).toBeEnabled();
    
    fireEvent.click(loginButton);
    
    const errorMessage = screen.getByText(/usuário ou senha incorretos!/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
