// src/services/authService.test.js
import { 
  getAccounts, 
  saveAccounts, 
  createAccount, 
  login, 
  logout 
} from './authService';

describe('authService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getAccounts', () => {
    it('should return an empty array when no accounts exist', () => {
      const accounts = getAccounts();
      expect(accounts).toEqual([]);
    });

    it('should return stored accounts from localStorage', () => {
      const mockAccounts = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
      ];
      localStorage.setItem('accounts', JSON.stringify(mockAccounts));

      const accounts = getAccounts();
      expect(accounts).toEqual(mockAccounts);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('accounts', 'invalid json');
      const accounts = getAccounts();
      expect(accounts).toEqual([]);
    });
  });

  describe('saveAccounts', () => {
    it('should save accounts to localStorage', () => {
      const mockAccounts = [
        { username: 'user1', password: 'pass1' }
      ];
      
      saveAccounts(mockAccounts);
      
      const stored = JSON.parse(localStorage.getItem('accounts'));
      expect(stored).toEqual(mockAccounts);
    });

    it('should overwrite existing accounts', () => {
      localStorage.setItem('accounts', JSON.stringify([{ username: 'old', password: 'old' }]));
      
      const newAccounts = [{ username: 'new', password: 'new' }];
      saveAccounts(newAccounts);
      
      const stored = JSON.parse(localStorage.getItem('accounts'));
      expect(stored).toEqual(newAccounts);
    });
  });

  describe('createAccount', () => {
    it('should create a new account successfully', async () => {
      const username = 'newuser';
      const password = 'newpass';

      const result = await createAccount(username, password);

      expect(result).toEqual({ username, password });
      const accounts = getAccounts();
      expect(accounts).toContainEqual({ username, password });
    });

    it('should reject duplicate usernames', async () => {
      const username = 'duplicate';
      const password = 'pass1';

      await createAccount(username, password);

      await expect(createAccount(username, 'pass2'))
        .rejects
        .toThrow('Username already exists');
    });

    it('should add account to existing accounts list', async () => {
      await createAccount('user1', 'pass1');
      await createAccount('user2', 'pass2');

      const accounts = getAccounts();
      expect(accounts).toHaveLength(2);
      expect(accounts[0]).toEqual({ username: 'user1', password: 'pass1' });
      expect(accounts[1]).toEqual({ username: 'user2', password: 'pass2' });
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      // Create test accounts
      await createAccount('testuser', 'testpass');
    });

    it('should login successfully with correct credentials', async () => {
      const result = await login('testuser', 'testpass');
      
      expect(result).toEqual({ username: 'testuser', password: 'testpass' });
    });

    it('should reject login with incorrect password', async () => {
      await expect(login('testuser', 'wrongpass'))
        .rejects
        .toThrow('Invalid username or password');
    });

    it('should reject login with non-existent username', async () => {
      await expect(login('nonexistent', 'password'))
        .rejects
        .toThrow('Invalid username or password');
    });

    it('should reject login with empty credentials', async () => {
      await expect(login('', ''))
        .rejects
        .toThrow('Invalid username or password');
    });
  });

  describe('logout', () => {
    it('should return true', () => {
      const result = logout();
      expect(result).toBe(true);
    });
  });
});
