//환불 요청

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const RefundApi = async () => {
    try {
        const response = await axios.post(
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

export default RefundApi;