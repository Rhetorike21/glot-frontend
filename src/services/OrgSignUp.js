//기관 회원가입 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const OrganizationSignUpApi = async (userId, userPw, userName, userPhone, userHandPhone, userEmail, marketingAgreement, userCode, userSchool) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/sign-up/org`,
            {
                accountId: userId,
                password: userPw,
                name: userName,
                phone: userPhone,
                mobile: userHandPhone,
                email: userEmail,
                marketingAgreement: marketingAgreement,
                code: userCode,
                organizationName: userSchool
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default OrganizationSignUpApi;   