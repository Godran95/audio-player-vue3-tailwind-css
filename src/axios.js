import axios from "axios";

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_URL,
});

export default HTTP;
