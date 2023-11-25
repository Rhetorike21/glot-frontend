//휴대폰 인증 코드 확인 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const MobileCheckApi = async ( userMobileCode ) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/cert/sms/verify?code=${userMobileCode}`
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default MobileCheckApi