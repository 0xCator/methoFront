export const getUserData = () => {
    return localStorage.getItem('userData');
}

export const setUserData = (data: any) => {
    localStorage.setItem('userData', data);
}

export const removeUserData = () => {
    localStorage.removeItem('userData');
    return null;
}