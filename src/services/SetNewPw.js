//비밀번호 재설정 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const SetPwApi = async (userId, userCode, userPw) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/reset/password/email`,
            {
                accountId: userId,
                code: userCode,
                password: userPw,
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default SetPwApi;