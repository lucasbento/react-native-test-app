import {expectSaga} from 'redux-saga-test-plan';
import {combineReducers} from 'redux';
import * as matchers from 'redux-saga-test-plan/matchers';
import PostSaga from '../PostSaga';
import PostActions from '../PostActions';
import PostReducer, {initialState} from '../PostReducer';
import api from '../../../../api';
import {responses} from '../../../../configuration/testUtils';
import posts from '../../../../../__fixtures__/posts.json';
import post from '../../../../../__fixtures__/post.json';
import user from '../../../../../__fixtures__/user.json';

jest.unmock('axios');

describe('PostSaga', () => {
  describe('handleFetchPostsRequest', () => {
    it('should handle fetching posts successfully', async () => {
      const result = await expectSaga(PostSaga)
        // Specify reducer and initial state
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        // Mock the response from API
        .provide([
          [
            matchers.call.fn(api.fetchPosts),
            responses.successful({data: posts}),
          ],
        ])
        // Dispatch the action that it wants to test
        .dispatch(PostActions.fetchPostsRequest())
        // Specify that it needs to call the API
        .call(api.fetchPosts)
        // And that it should dispatch the success action
        .put(PostActions.fetchPostsSuccess({posts: posts}))
        .silentRun();

      // Then compare the final reducer state
      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostsLoading: false,
        posts,
      });
    });

    it('should handle failed response from fetching posts', async () => {
      const result = await expectSaga(PostSaga)
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        .provide([[matchers.call.fn(api.fetchPosts), responses.failed()]])
        .dispatch(PostActions.fetchPostsRequest())
        .call(api.fetchPosts)
        .put(PostActions.fetchPostsFail({error: undefined}))
        .silentRun();

      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostsLoading: false,
        hasFetchPostsErrored: true,
      });
    });
  });

  describe('handleFetchPostRequest', () => {
    it('should handle fetching a single post successfully', async () => {
      const postWithUser = {
        ...post,
        user,
      };

      const result = await expectSaga(PostSaga)
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        .provide([
          [matchers.call.fn(api.fetchPost), responses.successful({data: post})],
          [matchers.call.fn(api.fetchUser), responses.successful({data: user})],
        ])
        .dispatch(
          PostActions.fetchPostRequest({
            id: post.id,
            userId: post.userId,
          }),
        )
        .call(api.fetchPost, {id: post.id})
        .call(api.fetchUser, {id: post.userId})
        .put(
          PostActions.fetchPostSuccess({
            post: postWithUser,
          }),
        )
        .silentRun();

      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostLoading: false,
        post: postWithUser,
      });
    });

    it('should handle failed fetches of post and user', async () => {
      const result = await expectSaga(PostSaga)
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        .provide([
          [matchers.call.fn(api.fetchPost), responses.failed()],
          [matchers.call.fn(api.fetchUser), responses.failed()],
        ])
        .dispatch(
          PostActions.fetchPostRequest({
            id: post.id,
            userId: post.userId,
          }),
        )
        .call(api.fetchPost, {id: post.id})
        .call(api.fetchUser, {id: post.userId})
        .put(PostActions.fetchPostFail())
        .silentRun();

      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostLoading: false,
        hasFetchPostErrored: true,
      });
    });

    it('should handle failed fetches of only post', async () => {
      const result = await expectSaga(PostSaga)
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        .provide([
          [matchers.call.fn(api.fetchPost), responses.failed()],
          [matchers.call.fn(api.fetchUser), responses.successful({data: user})],
        ])
        .dispatch(
          PostActions.fetchPostRequest({
            id: post.id,
            userId: post.userId,
          }),
        )
        .call(api.fetchPost, {id: post.id})
        .call(api.fetchUser, {id: post.userId})
        .put(PostActions.fetchPostFail())
        .silentRun();

      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostLoading: false,
        hasFetchPostErrored: true,
      });
    });

    it('should handle failed fetches of only user', async () => {
      const result = await expectSaga(PostSaga)
        .withReducer(
          combineReducers({
            post: PostReducer,
          }),
          {
            post: initialState,
          },
        )
        .provide([
          [matchers.call.fn(api.fetchPost), responses.successful({data: post})],
          [matchers.call.fn(api.fetchUser), responses.failed()],
        ])
        .dispatch(
          PostActions.fetchPostRequest({
            id: post.id,
            userId: post.userId,
          }),
        )
        .call(api.fetchPost, {id: post.id})
        .call(api.fetchUser, {id: post.userId})
        .put(PostActions.fetchPostFail())
        .silentRun();

      expect(result.storeState.post).toEqual({
        ...initialState,
        isFetchPostLoading: false,
        hasFetchPostErrored: true,
      });
    });
  });
});
