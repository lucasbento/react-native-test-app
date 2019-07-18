const PostActionTypes = {
  FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL: 'FETCH_POSTS_FAIL',
  FETCH_POST_REQUEST: 'FETCH_POST_REQUEST',
  FETCH_POST_SUCCESS: 'FETCH_POST_SUCCESS',
  FETCH_POST_FAIL: 'FETCH_POST_FAIL',
  // This is used when the component unmounts so the next time
  // the user opens the `PostDetail` screen it doesn't blink on first render
  RESET_LAST_FETCHED_POST: 'RESET_LAST_FETCHED_POST',
};

const PostActions = {
  fetchPostsRequest: () => ({
    type: PostActionTypes.FETCH_POSTS_REQUEST,
  }),
  fetchPostsSuccess: ({posts}) => ({
    type: PostActionTypes.FETCH_POSTS_SUCCESS,
    payload: {
      posts,
    },
  }),
  fetchPostsFail: () => ({
    type: PostActionTypes.FETCH_POSTS_FAIL,
  }),
  fetchPostRequest: ({id, userId}) => ({
    type: PostActionTypes.FETCH_POST_REQUEST,
    payload: {
      id,
      userId,
    },
  }),
  fetchPostSuccess: ({post}) => ({
    type: PostActionTypes.FETCH_POST_SUCCESS,
    payload: {
      post,
    },
  }),
  fetchPostFail: () => ({
    type: PostActionTypes.FETCH_POST_FAIL,
  }),
  resetLastFetchedPost: () => ({
    type: PostActionTypes.RESET_LAST_FETCHED_POST,
  }),
};

export {PostActionTypes};
export default PostActions;
