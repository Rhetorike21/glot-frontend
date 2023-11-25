//작문 저장 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const WritingSaveApi = async (writingBoardId, title, content) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/writing`,
            {
                writingBoardId: writingBoardId,
                title: title,
                content: content,
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

export default WritingSaveApi;