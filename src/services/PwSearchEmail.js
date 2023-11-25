//이메일로 비밀번호 찾기 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const PwSearchEmailApi = async ( userId, userName, userEmail ) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/reset/password/email`,
            {
                accountId: userId,
                name: userName,
                email: userEmail,
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default PwSearchEmailApi;