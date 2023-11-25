// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { BASE_URL } from "../constants/Url";
// import { useNavigate } from "react-router-dom";

// const useAxiosWithAuth = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
//   const navigate = useNavigate();

//   const createAxiosInstance = () => {
//     return axios.create({
//       baseURL: BASE_URL,
//     });
//   };

//   let axiosInstance = createAxiosInstance();

//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const statusCode = error.response?.status;
//       if (statusCode === 401) {
//         try {
//             const refreshResponse = await axios.post(
//             `${BASE_URL}/auth/reissue`,
//             { 
//                 refresh: cookies.token,
//                 auth : localStorage.getItem('token')
//             }
//             );
//             console.log(refreshResponse);
//             const newToken = refreshResponse.data.accessToken;
//             localStorage.setItem("token", newToken);
//             axiosInstance = createAxiosInstance();
//             error.config.headers["Authorization"] = `Bearer ${newToken}`;
//             return axiosInstance(error.config);
//         } catch (refreshError) {
//           removeCookie("token");
//           navigate("/");
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxiosWithAuth;


import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../constants/Url';

const TokenReissueApi = async () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    try {
        const response = await axios.post(
            `${BASE_URL}/auth/reissue`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                    refresh: cookies.token,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default TokenReissueApi;