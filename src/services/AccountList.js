//기관 사용자 구매 계정 목록 조회 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const AccountListApi = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/subscription/members`,
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

export default AccountListApi;