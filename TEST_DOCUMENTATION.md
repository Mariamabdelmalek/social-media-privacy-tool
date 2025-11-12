# Unit Tests Documentation

This document provides an overview of the comprehensive unit tests that have been added to the social media privacy tool project.

## Test Coverage Summary

The following test files have been created to ensure code quality and reliability:

### 1. **authService.test.js**
Tests for the authentication service module that handles user account management.

**Test Coverage:**
- `getAccounts()`: Retrieves accounts from localStorage
  - Returns empty array when no accounts exist
  - Returns stored accounts from localStorage
  - Handles invalid JSON gracefully
  
- `saveAccounts()`: Saves accounts to localStorage
  - Successfully saves accounts
  - Overwrites existing accounts

- `createAccount()`: Creates new user accounts
  - Creates account successfully with valid credentials
  - Rejects duplicate usernames
  - Adds account to existing accounts list

- `login()`: Authenticates users
  - Successful login with correct credentials
  - Rejects incorrect password
  - Rejects non-existent username
  - Rejects empty credentials

- `logout()`: Clears user session
  - Returns true on logout

### 2. **UserContext.test.js**
Tests for the React Context that manages user state across the application.

**Test Coverage:**
- Initialization
  - Initializes with no user when localStorage is empty
  - Initializes with user from localStorage if available
  - Handles invalid JSON in localStorage gracefully

- User Management
  - Logs in user and persists to localStorage
  - Logs out user and removes from localStorage
  - Updates localStorage when user changes

- Error Handling
  - Throws error when useUser is used outside of UserProvider

### 3. **PrivateRoute.test.js**
Tests for the route protection component that guards authenticated routes.

**Test Coverage:**
- Authentication-based Routing
  - Renders children when user is logged in
  - Redirects to login when user is not logged in
  - Redirects to login when user is undefined

### 4. **Login.test.js**
Tests for the login page component with both login and account creation modes.

**Test Coverage:**
- Initial Render
  - Renders login form by default
  - Shows toggle to create account

- Login Functionality
  - Successfully logs in with valid credentials
  - Displays error message on failed login
  - Clears form fields after successful login

- Account Creation
  - Toggles to create account mode
  - Creates new account successfully
  - Displays error when creating duplicate account

- Logged In State
  - Shows welcome message when user is logged in
  - Handles logout

- Form Validation
  - Requires username field
  - Requires password field
  - Has password input type

- Error Handling
  - Clears error message when switching modes

### 5. **Dashboard.test.js**
Tests for the main dashboard page that displays user privacy information.

**Test Coverage:**
- Header Section
  - Renders welcome message with/without username

- Risk Scores Section
  - Renders recent risk scores heading
  - Displays all platform risk scores (Instagram, Facebook, X/Twitter)
  - Displays correct risk scores for each platform
  - Renders platform icons

- Scan History Section
  - Renders scan history heading
  - Displays table headers
  - Displays scan history data
  - Displays correct number of history entries

- Recommendations Section
  - Renders recommendations heading
  - Displays all recommendations
  - Renders correct number of recommendations

- Privacy Trends Section
  - Renders privacy trends heading
  - Displays chart placeholder

- Data Integration
  - Renders with proper structure and sections
  - Handles user with special characters in username

### 6. **NavBar.test.js**
Tests for the navigation bar component that provides site-wide navigation.

**Test Coverage:**
- Navigation Links
  - Renders all navigation links
  - Has correct href attributes for navigation links

- Search Functionality
  - Renders search input
  - Renders search button

- User Profile
  - Renders user profile icon

- Logout Functionality
  - Displays logout button when user is logged in
  - Doesn't display logout button when user is not logged in
  - Handles logout when logout button is clicked
  - Clears user from context after logout

- NavBar Structure
  - Has nav element with navbar class
  - Has left navigation section
  - Has right navigation section

- Icon Buttons
  - Has icon class on search button
  - Has icon class on profile button
  - Has logout class on logout button when user is logged in

- User State Integration
  - Properly integrates with UserContext
  - Handles undefined user gracefully
  - Handles null user gracefully

- Navigation Behavior
  - Calls navigate with correct path on logout

## Running the Tests

To run all tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm test -- --watch
```

To run tests with coverage:
```bash
npm test -- --coverage
```

To run a specific test file:
```bash
npm test -- authService.test.js
```

## Test Setup

The project uses:
- **Jest**: Testing framework
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: For additional DOM matchers

All tests follow best practices:
- Each test file has a corresponding source file
- Tests are isolated and independent
- localStorage is cleared before each test
- Mocks are reset between tests
- Proper cleanup is performed after tests

## Key Testing Patterns Used

1. **Component Testing**: Rendering components with necessary providers (UserProvider, BrowserRouter)
2. **Mocking**: Mocking external dependencies like authService and react-router-dom's useNavigate
3. **User Interaction Testing**: Using fireEvent to simulate user actions
4. **Async Testing**: Using waitFor for asynchronous operations
5. **State Management Testing**: Testing React Context and localStorage integration
6. **Snapshot Testing**: Ensuring UI consistency
7. **Edge Case Testing**: Testing error conditions, empty states, and invalid inputs

## Notes

- All tests use the official React Testing Library best practices
- Tests focus on user-facing behavior rather than implementation details
- Mock localStorage is properly managed to avoid test pollution
- All async operations are properly awaited to prevent timing issues
