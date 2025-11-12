
// src\services\authService.js
export function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

// Function saves accounts to local storage
export function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Creates new account
export function createAccount(username, password) {
    return new Promise((resolve, reject) => {
    const accounts = getAccounts();

    //Checks for duplicate usernames
    if (accounts.find(acc => acc.username === username)) {
        throw new Error('Username already exists');
    }

    //Stores username and/or password, can be updated to be saved to backend in the future
    if (accounts.find(acc => acc.username === username)) {
      reject(new Error('Username already exists'));
    } else {
      const newAccount = { username, password };
      const updatedAccounts = [...accounts, newAccount];
      saveAccounts(updatedAccounts);
      resolve(newAccount);
    }
  });
}

//Login the user
export function login(username, password) {
    return new Promise((resolve, reject) => {
    const accounts = getAccounts();
    
    //Verifies the username and pasword match an existing account
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    //Throws error if account is not valid
    if (!user) {
      reject(new Error('Invalid username or password'));
    } else {
      resolve(user);
    }
  });
}
//Clears current user session
export function logout() {

    return true;
}