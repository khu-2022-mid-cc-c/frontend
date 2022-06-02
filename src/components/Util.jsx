import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookies = (key, value) => {
    return cookies.set(key, value);
}

export const getCookies = (key) => {
    return cookies.get(key);
}