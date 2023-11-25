//내 정보 수정 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const MyInfoEditApi = async (name,mobile,email,password) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/user/info`,
            {
                name: name,
                mobile: mobile,
                email: email,
                password: password,
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