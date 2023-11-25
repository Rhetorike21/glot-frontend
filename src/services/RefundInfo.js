//환불 정보 가져오기

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const RefundInfoApi = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/orders/refund`,
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

export default RefundInfoApi;