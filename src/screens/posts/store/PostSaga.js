import {call, put, all, takeLatest} from 'redux-saga/effects';
import PostActions, {PostActionTypes} from './PostActions';
import api from '../../../api';

function* handleFetchPostsRequest() {
  const response = yield call(api.fetchPosts);

  if (response.success) {
    return yield put(PostActions.fetchPostsSuccess({posts: response.data}));
  }

  return yield put(PostActions.fetchPostsFail());
}

function* handleFetchPostRequest(action) {
  const {id, userId} = action.payload;

  const [responsePost, responseUser] = yield all([
    call(api.fetchPost, {id}),
    call(api.fetchUser, {id: userId}),
  ]);

  if (!responsePost.success || !responseUser.success) {
    return yield put(PostActions.fetchPostFail());
  }

  return yield put(
    PostActions.fetchPostSuccess({
      post: {
        ...responsePost.data,
        user: responseUser.data,
      },
    }),
  );
}

function* PostSaga() {
  yield takeLatest(
    PostActionTypes.FETCH_POSTS_REQUEST,
    handleFetchPostsRequest,
  );
  yield takeLatest(PostActionTypes.FETCH_POST_REQUEST, handleFetchPostRequest);
}

export default PostSaga;
