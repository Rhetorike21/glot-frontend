//작문 드래그 앤 드롭 이동 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const WritingMoveApi = async (targetId, destinationId) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/writing/move`,
            {
                targetId: targetId,
                destinationId: destinationId,
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

export default WritingMoveApi;