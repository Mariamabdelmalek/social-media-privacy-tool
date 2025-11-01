// src/pages/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { UserProvider } from '../context/UserContext';
import * as authService from '../services/authService';

// Mock the auth service functions
jest.mock('../services/authService');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
  };

  describe('Initial Render', () => {
    it('should render login form by default', () => {
      renderLogin();

      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should show toggle to create account', () => {
      renderLogin();

      expect(screen.getByText("Need an account? Create one")).toBeInTheDocument();
    });
  });

  describe('Login Functionality', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = { username: 'testuser', password: 'testpass' };
      authService.login.mockResolvedValue(mockUser);

      renderLogin();

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith('testuser', 'testpass');
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should display error message on failed login', async () => {
      authService.login.mockRejectedValue(new Error('Invalid username or password'));

      renderLogin();

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
      });
    });

    it('should clear form fields after successful login', async () => {
      const mockUser = { username: 'testuser', password: 'testpass' };
      authService.login.mockResolvedValue(mockUser);

      renderLogin();

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(usernameInput.value).toBe('');
        expect(passwordInput.value).toBe('');
      });
    });
  });

  describe('Account Creation', () => {
    it('should toggle to create account mode', () => {
      renderLogin();

      const toggleButton = screen.getByText("Need an account? Create one");
      fireEvent.click(toggleButton);

      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
      expect(screen.getByText("Already have an account? Login")).toBeInTheDocument();
    });

    it('should create new account successfully', async () => {
      const mockUser = { username: 'newuser', password: 'newpass' };
      authService.createAccount.mockResolvedValue(mockUser);

      renderLogin();

      // Switch to create account mode
      const toggleButton = screen.getByText("Need an account? Create one");
      fireEvent.click(toggleButton);

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const createButton = screen.getByRole('button', { name: 'Create Account' });

      fireEvent.change(usernameInput, { target: { value: 'newuser' } });
      fireEvent.change(passwordInput, { target: { value: 'newpass' } });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(authService.createAccount).toHaveBeenCalledWith('newuser', 'newpass');
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should display error when creating duplicate account', async () => {
      authService.createAccount.mockRejectedValue(new Error('Username already exists'));

      renderLogin();

      // Switch to create account mode
      const toggleButton = screen.getByText("Need an account? Create one");
      fireEvent.click(toggleButton);

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const createButton = screen.getByRole('button', { name: 'Create Account' });

      fireEvent.change(usernameInput, { target: { value: 'existinguser' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText('Username already exists')).toBeInTheDocument();
      });
    });
  });

  describe('Logged In State', () => {
    it('should show welcome message when user is logged in', () => {
      const user = { username: 'testuser' };
      localStorage.setItem('currentUser', JSON.stringify(user));

      renderLogin();

      expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    });

    it('should handle logout', () => {
      const user = { username: 'testuser' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      authService.logout.mockReturnValue(true);

      renderLogin();

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      fireEvent.click(logoutButton);

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    it('should require username field', () => {
      renderLogin();

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      expect(usernameInput).toBeRequired();
    });

    it('should require password field', () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      expect(passwordInput).toBeRequired();
    });

    it('should have password input type', () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Error Handling', () => {
    it('should clear error message when switching modes', () => {
      authService.login.mockRejectedValue(new Error('Invalid credentials'));

      renderLogin();

      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(usernameInput, { target: { value: 'user' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
      fireEvent.click(loginButton);

      waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Switch to create account mode
      const toggleButton = screen.getByText("Need an account? Create one");
      fireEvent.click(toggleButton);

      expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
    });
  });
});
