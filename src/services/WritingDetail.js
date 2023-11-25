//단건 조회 API

import axios from "axios";
import { BASE_URL } from "../constants/Url";

const WritingDetailApi = async (writingId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/writing/${writingId}`, 
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default WritingDetailApi;