// 기관 사용자 구매 계정 정보 수정 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const MyInfoEditApi = async (accountId, password, name, active) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/subscription/,members`,
            {
                accountId: accountId,
                password: password,
                name: name,
                active: active,
            },
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default MyInfoEditApi;