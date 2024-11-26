import axios from 'axios';

export const ServicesApi = async (url, data) => {
    console.log("api",url, data)
  try {
    const res = await axios.post(url, data);
    if (res?.data) {
      return res.data; // Return the response data if successful
    }
   } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      return { error: error.response.data };
    } else if (error.request) {

      // The request was made but no response was received
      return { error: 'No response received from server' };
    } else {

      // Something happened in setting up the request that triggered an Error
      return { error: 'Error setting up the request' };
    }
  }
};
