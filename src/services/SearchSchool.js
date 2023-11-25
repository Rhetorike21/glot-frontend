//회원가입 기관 검색 API

import axios from 'axios';
import { BASE_URL } from '../constants/Url';

const SearchApi = async (keyword) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/search/org`,
            {keyword: keyword}
        );

        return response.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
        throw new Error(error.response.data.message);
    }
}

export default SearchApi;