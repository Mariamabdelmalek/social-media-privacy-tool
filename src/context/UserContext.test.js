// src/context/UserContext.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

// Test component that uses the UserContext
function TestComponent() {
  const { user, login, logout } = useUser();
  
  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as ${user.username}` : 'Not logged in'}
      </div>
      <button onClick={() => login({ username: 'testuser', password: 'testpass' })}>
        Login
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

describe('UserContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with no user when localStorage is empty', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });

  it('should initialize with user from localStorage if available', () => {
    const savedUser = { username: 'saveduser', password: 'savedpass' };
    localStorage.setItem('currentUser', JSON.stringify(savedUser));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as saveduser');
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('currentUser', 'invalid json');
    
    // Spy on console.error to suppress error output in test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    expect(localStorage.getItem('currentUser')).toBeNull();
    
    consoleErrorSpy.mockRestore();
  });

  it('should login user and persist to localStorage', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText('Login');
    
    act(() => {
      loginButton.click();
    });

    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as testuser');
    
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    expect(storedUser).toEqual({ username: 'testuser', password: 'testpass' });
  });

  it('should logout user and remove from localStorage', () => {
    const savedUser = { username: 'testuser', password: 'testpass' };
    localStorage.setItem('currentUser', JSON.stringify(savedUser));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as testuser');

    const logoutButton = screen.getByText('Logout');
    
    act(() => {
      logoutButton.click();
    });

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should update localStorage when user changes', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText('Login');
    
    act(() => {
      loginButton.click();
    });

    expect(localStorage.getItem('currentUser')).toBeTruthy();

    const logoutButton = screen.getByText('Logout');
    
    act(() => {
      logoutButton.click();
    });

    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should throw error when useUser is used outside of UserProvider', () => {
    // Suppress console error for this test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Component that tries to use useUser without provider
    function InvalidComponent() {
      useUser();
      return null;
    }

    expect(() => {
      render(<InvalidComponent />);
    }).toThrow();

    consoleErrorSpy.mockRestore();
  });
});
