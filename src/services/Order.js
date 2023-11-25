//요금제 결제 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const OrderApi = async (planId, quantity, payment) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/orders`,
            {
                planId: planId,
                quantity: quantity,
                payment: payment,
            },
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default OrderApi;