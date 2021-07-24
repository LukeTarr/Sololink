export let isLoggedIn;

export function setAuthToken(token) {
    isLoggedIn = true;
    localStorage.setItem('token', token);
}

export function getAuthToken() {
    return localStorage.getItem('token');
}

export function logout() {
    isLoggedIn = false;
    localStorage.clear();
}

