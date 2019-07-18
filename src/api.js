import axios from 'axios';

const API_URL = 'http://jsonplaceholder.typicode.com';

const request = async ({url, method = 'GET', ...rest}) => {
  const response = await axios({
    url: `${API_URL}${url}`,
    method,
    ...rest,
  });

  return {
    ...response,
    // Verify if the request was a success
    success: response.status.toString()[0] === '2',
  };
};

const api = {
  fetchPosts: () => request({url: '/posts'}),
  fetchPost: ({id}) => request({url: `/posts/${id}`}),
  fetchUser: ({id}) => request({url: `/users/${id}`}),
};

export default api;
