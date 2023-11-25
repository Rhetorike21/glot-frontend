//회원 탈퇴 API

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../constants/Url';

const WithdrawApi = async () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    try {
        const response = await axios.post(
            `${BASE_URL}/auth/withdraw`,
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

export default WithdrawApi;