// src/components/PrivateRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from '../context/UserContext';

// Mock components for testing
function ProtectedComponent() {
  return <div>Protected Content</div>;
}

function LoginComponent() {
  return <div>Login Page</div>;
}

// Helper function to render PrivateRoute with necessary providers
function renderPrivateRoute(user = null) {
  // Mock localStorage
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }

  return render(
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            } 
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render children when user is logged in', () => {
    const user = { username: 'testuser', password: 'testpass' };
    renderPrivateRoute(user);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not logged in', () => {
    renderPrivateRoute(null);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is undefined', () => {
    renderPrivateRoute(undefined);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
