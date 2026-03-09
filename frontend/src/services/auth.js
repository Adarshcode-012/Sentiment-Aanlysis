// Mock authentication service using localStorage
export const AUTH_STORAGE_KEY = 'aitrend_user_session';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email, password) => {
    await delay(1000); // Simulate network delay
    // Mock validation
    if (email && password.length >= 6) {
        const user = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: null,
            plan: 'Enterprise',
            authMethod: 'email'
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return user;
    }
    throw new Error('Invalid email or password (min 6 characters)');
};

export const register = async (name, email, password) => {
    await delay(1000);
    if (name && email && password.length >= 6) {
        const user = {
            id: Date.now().toString(),
            name,
            email,
            avatar: null,
            plan: 'Free Trial',
            authMethod: 'email'
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return user;
    }
    throw new Error('Please fill all fields correctly');
};

export const loginWithGoogle = async () => {
    await delay(1500); // Simulate Google popup
    const user = {
        id: 'google_123',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: null,
        plan: 'Free Trial',
        authMethod: 'google'
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
};

export const loginWithPhone = async (phoneNumber) => {
    await delay(1000); // Simulate OTP request
    // In a real app, this would be a two-step process
    const user = {
        id: 'phone_123',
        name: 'Phone User',
        email: null,
        phoneNumber,
        avatar: null,
        plan: 'Free Trial',
        authMethod: 'phone'
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
};

export const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getCurrentUser = () => {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
};
