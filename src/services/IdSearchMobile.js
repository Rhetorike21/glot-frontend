//휴대폰 번호로 아이디 찾기 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const IdSearchMobileApi = async (userName, userMobile, userMobileCode) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/find/account-id/mobile`,
            {
                name: userName,
                mobile: userMobile,
                code: userMobileCode,
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default IdSearchMobileApi;