import posts from '../__fixtures__/posts';
import post from '../__fixtures__/post';
import user from '../__fixtures__/user';

const getEndpointFixture = url => {
  // Match endpoint for `/posts/{number}`
  if (url.match(/posts\/\d/)) {
    return post;
  }

  // Match endpoint for `/posts`
  if (url.match(/posts/)) {
    return posts;
  }

  // Match endpoint for `/users/{number}`
  if (url.match(/users\/\d/)) {
    return user;
  }

  return undefined;
};

const axios = jest.fn(config =>
  Promise.resolve({
    status: 200,
    data: getEndpointFixture(config.url),
  }),
);

export default axios;
