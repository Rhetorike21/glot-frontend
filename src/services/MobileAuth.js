//휴대폰 인증 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const MobileApi = async (userMobile) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/cert/sms/code`,
            {mobile: userMobile}
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default MobileApi;