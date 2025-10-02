
// Function returns stored accounts from local storage
export function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

// Function saves accounts to local storage
export function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Creates new account
export function createAccount(username, password) {
    const accounts = getAccounts();

    if (accounts.find(acc => acc.username === username)) {
        throw new Error('Username already exists');
    }

    const newAccount = { username, password };
    const updatedAccounts = [...accounts, newAccount];
    saveAccounts(updatedAccounts);
    
    return newAccount;
}

//Login the user
export function login(username, password) {
    const accounts = getAccounts();
    
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    return user;
}

//Clears current user session
export function logout() {

    return true;
}