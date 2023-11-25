// 작문 추천 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const SentenceRecomendApi = async (sentence, type) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/help/writing`,
            {
                sentence: sentence,
                type: type,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default SentenceRecomendApi;