//로그아웃 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';
import { useCookies } from 'react-cookie';

const LogoutApi = async () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    try {
        const response = await axios.post(
            `${BASE_URL}/auth/logout`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                    refresh: cookies.token,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default LogoutApi;