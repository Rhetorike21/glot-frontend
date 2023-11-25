//작문 리스트를 불러오는 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const WritingListApi = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/writing`,
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

export default WritingListApi;