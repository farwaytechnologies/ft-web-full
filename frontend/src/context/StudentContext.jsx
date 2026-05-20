import { createContext, useContext, useState } from 'react';

const StudentContext = createContext(null);

// Simple hash for password storage (not cryptographic, but prevents plain text)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
};

const ACCOUNTS_KEY = 'lms_accounts';

const getAccounts = () => {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; }
  catch { return {}; }
};

const saveAccounts = (accounts) =>
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(() => {
    try {
      const s = localStorage.getItem('studentInfo');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  // Returns null on success, error string on failure
  const register = ({ name, email, password }) => {
    const accounts = getAccounts();
    const key = email.toLowerCase();
    if (accounts[key]) return 'Email already registered. Please sign in.';
    accounts[key] = { name, email: key, passwordHash: simpleHash(password) };
    saveAccounts(accounts);
    const data = { name, email: key };
    localStorage.setItem('studentInfo', JSON.stringify(data));
    localStorage.setItem('lms_email', key);
    localStorage.setItem('lms_name', name);
    setStudent(data);
    return null;
  };

  // Returns null on success, error string on failure
  const loginStudent = ({ email, password }) => {
    const accounts = getAccounts();
    const key = email.toLowerCase();
    const account = accounts[key];
    if (!account) return 'No account found with this email.';
    if (account.passwordHash !== simpleHash(password)) return 'Incorrect password.';
    const data = { name: account.name, email: key };
    localStorage.setItem('studentInfo', JSON.stringify(data));
    localStorage.setItem('lms_email', key);
    localStorage.setItem('lms_name', account.name);
    setStudent(data);
    return null;
  };

  const logout = () => {
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('lms_email');
    localStorage.removeItem('lms_name');
    setStudent(null);
  };

  return (
    <StudentContext.Provider value={{ student, register, loginStudent, logout }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => useContext(StudentContext);
