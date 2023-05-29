import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            }, { headers: { 'Accept': 'application/json' } })
            .then(response => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data.usuario));
                    sessionStorage.setItem("token", response.data.token);
                }
                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    }

    register(name, email, password) {
        return axios.post(API_URL + "register", {
            name,
            email,
            password
        }, { headers: { 'Accept': 'application/json' } });
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));;
    }
}

export default new AuthService();