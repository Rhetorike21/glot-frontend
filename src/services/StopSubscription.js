//구독 취소 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const StopApi = async () => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/subscription/stop`,
            {
                auth: localStorage.getItem('token'),
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default StopApi;