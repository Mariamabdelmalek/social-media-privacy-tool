// src\pages\Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { UserProvider } from '../context/UserContext';

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderDashboard = (user = null) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    return render(
      <UserProvider>
        <Dashboard />
      </UserProvider>
    );
  };

  describe('Header Section', () => {
    it('should render welcome message without username when no user logged in', () => {
      renderDashboard();

      expect(screen.getByText(/Welcome to your Privacy Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Overview of your social media privacy risks/i)).toBeInTheDocument();
    });

    it('should render welcome message with username when user is logged in', () => {
      renderDashboard({ username: 'testuser' });

      expect(screen.getByText(/Welcome, testuser to your Privacy Dashboard/i)).toBeInTheDocument();
    });
  });

  describe('Risk Scores Section', () => {
    it('should render recent risk scores heading', () => {
      renderDashboard();

      expect(screen.getByText('Recent Risk Scores')).toBeInTheDocument();
    });

    it('should display all platform risk scores', () => {
      renderDashboard();

      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('X (Twitter)')).toBeInTheDocument();
    });

    it('should display correct risk scores for each platform', () => {
      renderDashboard();

      expect(screen.getByText('Risk Score: 72/100')).toBeInTheDocument(); // Instagram
      expect(screen.getByText('Risk Score: 65/100')).toBeInTheDocument(); // Facebook
      expect(screen.getByText('Risk Score: 80/100')).toBeInTheDocument(); // X (Twitter)
    });

    it('should render platform icons', () => {
      const { container } = renderDashboard();

      // Check that icons are rendered (they should be present in the DOM)
      const riskCards = container.querySelectorAll('[style*="flex: 1 1 200px"]');
      expect(riskCards).toHaveLength(3);
    });
  });

  describe('Scan History Section', () => {
    it('should render scan history heading', () => {
      renderDashboard();

      expect(screen.getByText('Scan History')).toBeInTheDocument();
    });

    it('should display scan history table headers', () => {
      renderDashboard();

      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Platform')).toBeInTheDocument();
      expect(screen.getByText('Findings')).toBeInTheDocument();
      expect(screen.getByText('Risk Score')).toBeInTheDocument();
    });

    it('should display scan history data', () => {
      renderDashboard();

      expect(screen.getByText('2025-09-20')).toBeInTheDocument();
      expect(screen.getByText('2 location tags, 1 phone number')).toBeInTheDocument();
      expect(screen.getByText('2025-09-18')).toBeInTheDocument();
      expect(screen.getByText('Workplace info in bio')).toBeInTheDocument();
    });

    it('should display correct number of history entries', () => {
      const { container } = renderDashboard();

      const tableRows = container.querySelectorAll('tbody tr');
      expect(tableRows).toHaveLength(2);
    });
  });

  describe('Recommendations Section', () => {
    it('should render recommendations heading', () => {
      renderDashboard();

      expect(screen.getByText('Recommendations')).toBeInTheDocument();
    });

    it('should display all recommendations', () => {
      renderDashboard();

      expect(screen.getByText(/Remove location tags from recent Instagram posts/i)).toBeInTheDocument();
      expect(screen.getByText(/Update Facebook privacy settings to hide workplace details/i)).toBeInTheDocument();
      expect(screen.getByText(/Enable two-factor authentication on all accounts/i)).toBeInTheDocument();
      expect(screen.getByText(/Regularly review connected apps and permissions/i)).toBeInTheDocument();
    });

    it('should render correct number of recommendations', () => {
      const { container } = renderDashboard();

      const recommendations = container.querySelectorAll('ul li');
      expect(recommendations).toHaveLength(4);
    });
  });

  describe('Privacy Trends Section', () => {
    it('should render privacy trends heading', () => {
      renderDashboard();

      expect(screen.getByText('Privacy Trends')).toBeInTheDocument();
    });

    it('should display chart placeholder', () => {
      renderDashboard();

      expect(screen.getByText('Chart Placeholder: Risk score over time')).toBeInTheDocument();
    });
  });

  describe('Data Integration', () => {
    it('should render with proper structure and sections', () => {
      const { container } = renderDashboard();

      // Check that main sections exist
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(4); // Risk Scores, History, Recommendations, Trends
    });

    it('should handle user with special characters in username', () => {
      renderDashboard({ username: 'test@user.com' });

      expect(screen.getByText(/Welcome, test@user.com to your Privacy Dashboard/i)).toBeInTheDocument();
    });
  });
});
