import axios from "axios";
import { BASE_URL } from "../constants/Url";

/*
예시 : 
useGetApi("challenges");
const headers = {
  ACCESS : "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJzd"
}
useGetApi("challenges", headers);
*/

export async function UseGetApi(url, headers, params) {
  const response = await axios.get(BASE_URL + url, {
    headers: headers,
    params: params,
  });

  return response.data;
}

export async function UsePostApi(url, requestBody, headers, params) {
  const response = await axios.post(BASE_URL + url, requestBody, {
    headers: headers,
    params: params,
  });

  return response.data;
}

export async function UsePutApi(url, requestBody, headers, params) {
  const response = await axios.put(BASE_URL + url, requestBody, {
    headers: headers,
    params: params,
  });

  return response.data;
}

export async function UsePatchApi(url, requestBody, headers, params) {
  const response = await axios.patch(BASE_URL + url, requestBody, {
    headers: headers,
    params: params,
  });

  return response.data;
}

export async function UseDeleteApi(url, headers) {
  const response = await axios.delete(BASE_URL + url, {
    headers: headers,
  });

  return response.data;
}
