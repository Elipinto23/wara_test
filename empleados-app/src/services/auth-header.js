export default function authHeader() {
    const token = sessionStorage.getItem('token');

    if (token) {
        return { 
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
        };
    } else {
        return {Accept: 'application/json'};
    }
}