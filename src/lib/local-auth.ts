import bcrypt from 'bcryptjs';

// Generate a random ID (simple implementation that works in browsers)
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  createdAt: string;
}

// Get users from localStorage
const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('users', JSON.stringify(users));
};

// Get current user from localStorage
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user: Omit<User, 'password'>) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Clear current user from localStorage
export const clearCurrentUser = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('currentUser');
};

// Register a new user
export const registerUser = async ({ name, email, password }: { 
  name: string; 
  email: string; 
  password: string; 
}) => {
  // Validate inputs
  if (!name || !email || !password) {
    throw new Error("Please provide all required fields");
  }
  
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => 
    user.email.toLowerCase() === email.toLowerCase()
  );
  
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  
  // Hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create new user
  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    profileImage: '/images/default-avatar.png',
    createdAt: new Date().toISOString()
  };
  
  // Save user to localStorage
  users.push(newUser);
  saveUsers(users);
  
  // Return user without password for client
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Authenticate a user
export const authenticateUser = async ({ 
  email, 
  password 
}: { 
  email: string; 
  password: string; 
}) => {
  // Validate inputs
  if (!email || !password) {
    throw new Error("Please enter your email and password");
  }
  
  const users = getUsers();
  
  // Find user by email
  const user = users.find(user => 
    user.email.toLowerCase() === email.toLowerCase()
  );
  
  if (!user) {
    throw new Error("No user found with this email");
  }
  
  // Check if password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Update user profile
export const updateUserProfile = (
  userId: string, 
  updates: Partial<Omit<User, 'id' | 'password'>>
) => {
  const users = getUsers();
  
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  
  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };
  
  saveUsers(users);
  
  // Update current user if it's the logged-in user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser({
      ...currentUser,
      ...updates
    });
  }
  
  // Return updated user without password
  const { password: _, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

// Change password
export const changePassword = async (
  userId: string, 
  { currentPassword, newPassword }: { currentPassword: string; newPassword: string }
) => {
  const users = getUsers();
  
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  
  // Verify current password
  const isPasswordValid = await bcrypt.compare(
    currentPassword, 
    users[userIndex].password
  );
  
  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }
  
  // Hash new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  // Update password
  users[userIndex].password = hashedPassword;
  saveUsers(users);
  
  return { success: true };
};

// Get user by ID
export function getUserById(id: string) {
  const users = getUsers();
  
  const user = users.find(user => user.id === id);
  if (!user) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 