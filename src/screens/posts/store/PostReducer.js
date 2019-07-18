import {PostActionTypes} from './PostActions';

const initialState = {
  isFetchPostsLoading: true,
  hasFetchPostsErrored: false,
  posts: [],
  isFetchPostLoading: true,
  hasFetchPostErrored: false,
  post: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetchPostsLoading: true,
        posts: initialState.posts,
        hasFetchPostsErrored: initialState.hasFetchPostsErrored,
      };

    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetchPostsLoading: false,
        posts: action.payload.posts,
      };

    case PostActionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        isFetchPostsLoading: false,
        hasFetchPostsErrored: true,
      };

    case PostActionTypes.FETCH_POST_REQUEST:
      return {
        ...state,
        isFetchPostLoading: true,
        post: initialState.post,
        hasFetchPostErrored: initialState.hasFetchPostErrored,
      };

    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        isFetchPostLoading: false,
        post: action.payload.post,
      };

    case PostActionTypes.FETCH_POST_FAIL:
      return {
        ...state,
        isFetchPostLoading: false,
        hasFetchPostErrored: true,
      };

    case PostActionTypes.RESET_LAST_FETCHED_POST:
      return {
        ...state,
        isFetchPostLoading: initialState.isFetchPostLoading,
        hasFetchPostErrored: initialState.hasFetchPostErrored,
        post: initialState.post,
      };

    default:
      return state;
  }
};

export {initialState};
export default reducer;
