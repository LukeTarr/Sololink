
export function setAuthToken(token) {
    localStorage.setItem('token', token);
}

export function getAuthToken() {
    return localStorage.getItem('token');
}

export function logout() {
    localStorage.clear();
}

export function isLoggedIn() {
    if(getAuthToken() !== null){
        return true
    } else {
        return false;
    }
}