//로그인 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const LoginApi = async (userId, userPw) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            {
                accountId: userId,
                password: userPw,
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export default LoginApi;