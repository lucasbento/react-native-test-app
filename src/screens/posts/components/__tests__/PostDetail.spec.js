import React from 'react';
import {
  render,
  waitForElement,
  flushMicrotasksQueue,
} from '../../../../configuration/renderer';
import PostActions from '../../store/PostActions';
import PostDetail from '../PostDetail';
import PostUser from '../PostUser';
import post from '../../../../../__fixtures__/post';

describe('<PostDetail />', () => {
  const props = {
    navigation: {
      getParam: jest.fn(param => {
        const paramsToReturn = {
          id: post.id,
          userId: post.userId,
        };

        return paramsToReturn[param];
      }),
    },
  };

  it('renders correctly', async () => {
    const {toJSON} = render(<PostDetail {...props} />);

    await flushMicrotasksQueue();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when loading', async () => {
    const {toJSON} = render(<PostDetail {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders post title', async () => {
    const {getByText} = render(<PostDetail {...props} />);

    const postTitle = await waitForElement(() => getByText(post.title));

    expect(postTitle).toBeDefined();
  });

  it('renders post body', async () => {
    const {getByText} = render(<PostDetail {...props} />);

    const postBody = await waitForElement(() => getByText(post.body));

    expect(postBody).toBeDefined();
  });

  it('renders post user', async () => {
    const {getByType} = render(<PostDetail {...props} />);

    const postUser = await waitForElement(() => getByType(PostUser));

    expect(postUser).toBeDefined();
  });

  it('resets the last fetched post when unmounting', async () => {
    const resetLastFetchedPost = jest.spyOn(
      PostActions,
      'resetLastFetchedPost',
    );
    const {unmount} = render(<PostDetail {...props} />);

    unmount();

    expect(resetLastFetchedPost).toHaveBeenCalled();
    expect(resetLastFetchedPost).toHaveBeenCalledTimes(1);
  });
});
