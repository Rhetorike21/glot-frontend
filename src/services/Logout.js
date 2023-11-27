//로그아웃 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const LogoutApi = async (auth, refresh) => {

    try {
        const response = await axios.post(
            `${BASE_URL}/auth/logout`,
            {
                headers: {
                    auth: auth,
                    refresh: refresh,
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