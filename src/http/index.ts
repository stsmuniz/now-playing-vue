import axios, {AxiosInstance} from "axios";

const http: AxiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default http;
