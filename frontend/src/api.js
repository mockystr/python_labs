import axios from 'axios';

const url = 'http://localhost:8000/';

/* SERVICES API */

export const getServices = (page = 1) => axios.get(`${url}?page=${page}`);

export const getMineServices = (page = 1, token = '') => {
    console.log('page from api', page, 'token from api', token);

    return axios.get(
        `${url}mine?${page}`,
        {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export const getServiceById = (id) => axios.get(`${url}${id}/`);

export const createServiceById = (token, name, description, photo, price, active) => {
    console.log('FROM API token', token);
    console.log('name', name);
    console.log('description', description);
    console.log('photo', photo);
    console.log('price', price);
    console.log('active', active);

    return axios.post(
        `${url}create/`,
        {
            "name": name,
            "description": description,
            // "photo": photo,
            "price": price,
            "active": active
        },
        {
            headers: {
                'Authorization': `Token ${token}`,
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const deleteServiceById = (id, token) => {
    return axios.delete(
        `${url}delete/${id}/`,
        {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
}

/* ACCOUNT API */

export const register = (username, password1, password2, email) => (axios.post(
    `${url}account/register/`,
    {
        'username': username,
        'password1': password1,
        'password2': password2,
        'email': email
    },
    {
        header: {
            'Content-Type': 'application/json'
        }
    }
))

export const login = (username, password) => (axios.post(
    `${url}account/login/`,
    {
        'username': username,
        'password': password
    },
    {
        header: {
            'Content-Type': 'application/json'
        }
    }
))

export const logout = (username, password) => (axios.post(`${url}account/logout/`))

export const getProfileById = (id) => axios.get(url + `account/id/${id}/`);

export const getProfileByUsername = (username) => axios.get(url + `account/username/${username}/`);