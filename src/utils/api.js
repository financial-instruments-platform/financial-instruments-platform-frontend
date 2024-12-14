const API_BASE_URL = 'https://financial-instruments-platform-backend.onrender.com/api';

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    localStorage.setItem('username', username);

    const data = await response.json();
    return data;
};

export const register = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return true;
};


export const getMessageHistoryBetween = async (who) => {
    const response = await fetch(`${API_BASE_URL}/history?recipient=${who}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json(); // List of message objects indicating sender content and recipient in it
}


export const getUsernames = async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json(); // list of usernames

}


export const getMySubscriptions = async () => {
    const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}


