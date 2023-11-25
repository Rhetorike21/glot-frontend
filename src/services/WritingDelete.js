//작문 삭제 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const WritingDeleteApi = async ( writingId ) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/writing/${writingId}`,
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

export default WritingDeleteApi;