//회원가입 기관 검색 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const SearchGetApi = async (keyword) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/search/org?keyword=${keyword}`,
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }
}

export default SearchGetApi;