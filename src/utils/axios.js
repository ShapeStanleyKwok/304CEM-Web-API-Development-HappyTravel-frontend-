import axios from 'axios'
import qs from 'querystring'

let instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        if (data) {
            return qs.stringify(data);
        }
        return data;
    }]
});


instance.interceptors.response.use(res => {
    if (res.data.code == -1) return Promise.reject(res.data.message);
    return res.data;
}, error => {
    return Promise.reject(error);
});

export default instance