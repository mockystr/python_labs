import axios from 'axios';

const url = 'http://localhost:8000/';

export const getServices = (page = 1) => axios.get(`${url}?page=${page}`);
export const getServiceById = (id) => axios.get(url + `${id}`);

export const getProfileById = (id) => axios.get(url + `account/id/${id}`);
export const getProfileByUsername = (username) => axios.get(url + `account/username/${username}`);