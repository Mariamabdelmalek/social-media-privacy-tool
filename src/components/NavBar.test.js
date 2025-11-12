// src/components/NavBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { UserProvider } from '../context/UserContext';
import * as authService from '../services/authService';

// Mock the auth service
jest.mock('../services/authService');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderNavBar = (user = null) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    return render(
      <BrowserRouter>
        <UserProvider>
          <NavBar />
        </UserProvider>
      </BrowserRouter>
    );
  };

  describe('Navigation Links', () => {
    it('should render all navigation links', () => {
      renderNavBar();

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Scan')).toBeInTheDocument();
      expect(screen.getByText('Exposed Data')).toBeInTheDocument();
      expect(screen.getByText('Recommendations')).toBeInTheDocument();
      expect(screen.getByText('Reports')).toBeInTheDocument();
    });

    it('should have correct href attributes for navigation links', () => {
      renderNavBar();

      const dashboardLink = screen.getByText('Dashboard').closest('a');
      const scanLink = screen.getByText('Scan').closest('a');
      const exposedLink = screen.getByText('Exposed Data').closest('a');
      const recommendationsLink = screen.getByText('Recommendations').closest('a');
      const reportsLink = screen.getByText('Reports').closest('a');

      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
      expect(scanLink).toHaveAttribute('href', '/scan');
      expect(exposedLink).toHaveAttribute('href', '/exposed');
      expect(recommendationsLink).toHaveAttribute('href', '/recommendations');
      expect(reportsLink).toHaveAttribute('href', '/reports');
    });
  });

  describe('Search Functionality', () => {
    it('should render search input', () => {
      renderNavBar();

      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('should render search button', () => {
      renderNavBar();

      const searchButton = screen.getByText('🔍');
      expect(searchButton).toBeInTheDocument();
      expect(searchButton.tagName).toBe('BUTTON');
    });
  });

  describe('User Profile', () => {
    it('should render user profile icon', () => {
      renderNavBar();

      const profileButton = screen.getByText('👤');
      expect(profileButton).toBeInTheDocument();
      expect(profileButton.tagName).toBe('BUTTON');
    });
  });

  describe('Logout Functionality', () => {
    it('should display logout button when user is logged in', () => {
      const user = { username: 'testuser' };
      renderNavBar(user);

      const logoutButton = screen.getByText('Logout');
      expect(logoutButton).toBeInTheDocument();
    });

    it('should not display logout button when user is not logged in', () => {
      renderNavBar();

      const logoutButton = screen.queryByText('Logout');
      expect(logoutButton).not.toBeInTheDocument();
    });

    it('should handle logout when logout button is clicked', () => {
      const user = { username: 'testuser' };
      authService.logout.mockReturnValue(true);
      renderNavBar(user);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      expect(authService.logout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should clear user from context after logout', () => {
      const user = { username: 'testuser' };
      authService.logout.mockReturnValue(true);
      renderNavBar(user);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      // After logout, button should not be visible
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('NavBar Structure', () => {
    it('should have nav element with navbar class', () => {
      const { container } = renderNavBar();

      const nav = container.querySelector('nav.navbar');
      expect(nav).toBeInTheDocument();
    });

    it('should have left navigation section', () => {
      const { container } = renderNavBar();

      const navLeft = container.querySelector('.nav-left');
      expect(navLeft).toBeInTheDocument();
    });

    it('should have right navigation section', () => {
      const { container } = renderNavBar();

      const navRight = container.querySelector('.nav-right');
      expect(navRight).toBeInTheDocument();
    });
  });

  describe('Icon Buttons', () => {
    it('should have icon class on search button', () => {
      const { container } = renderNavBar();

      const searchButton = screen.getByText('🔍');
      expect(searchButton).toHaveClass('icon');
    });

    it('should have icon class on profile button', () => {
      const { container } = renderNavBar();

      const profileButton = screen.getByText('👤');
      expect(profileButton).toHaveClass('icon');
    });

    it('should have logout class on logout button when user is logged in', () => {
      const user = { username: 'testuser' };
      renderNavBar(user);

      const logoutButton = screen.getByText('Logout');
      expect(logoutButton).toHaveClass('logout');
    });
  });

  describe('User State Integration', () => {
    it('should properly integrate with UserContext', () => {
      const user = { username: 'testuser', password: 'testpass' };
      renderNavBar(user);

      // Should show logout button when user exists in context
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should handle undefined user gracefully', () => {
      renderNavBar(undefined);

      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    it('should handle null user gracefully', () => {
      renderNavBar(null);

      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Behavior', () => {
    it('should call navigate with correct path on logout', () => {
      const user = { username: 'testuser' };
      authService.logout.mockReturnValue(true);
      renderNavBar(user);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
