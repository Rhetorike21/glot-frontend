//이메일로 아이디 찾기 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const IdSearchEmailApi = async ( userName, userEmail ) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/find/account-id/email`,
            {
                name: userName,
                email: userEmail,
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default IdSearchEmailApi;