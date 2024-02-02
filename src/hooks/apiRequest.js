import Axios from "axios"
let requestUrl = 'http://127.0.0.1:8001/';

const apiRequest = Axios.create({
    baseURL: requestUrl+'api/',
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ApiSecurityKey": "1234567890",

    },
    withCredentials:true
})

export const get = async (url, params = {}, config = {}) => {

    await csrf()

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...config.headers,
    };

    try {
        return await apiRequest.get(url, { headers });
    } catch (error) {
        throw new Error(error);
    }
};

export const post = async (url, data = {}, config = {}) => {

    await csrf()

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...config.headers,
    };

    try {
        return await apiRequest.post(url, data, { headers });
    } catch (error) {
        throw new Error(error);
    }
};

export const put = async (url, data = {}, config = {}) => {

    await csrf()

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...config.headers,
    };

    try {
        return await apiRequest.put(url, data, { headers });
    } catch (error) {
        throw new Error(error);
    }
};

export const csrf = async (url, params = {}, config = {}) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        ...config.headers,
    };

    try {
        return await apiRequest.get(`${requestUrl}sanctum/csrf-cookie`);
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchCountry = async () => {
    try {
        return await apiRequest.get("https://countryapi.io/api/all?apikey=arFv6zgGQkS24hKqSeowj1j6cfs8H1BcUKHSw4v1")
    } catch (error) {
        throw new Error(error);
    }

}


export default { get, post, csrf, put, fetchCountry };