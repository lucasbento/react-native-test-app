import React from 'react';
import {
  render,
  waitForElement,
  flushMicrotasksQueue,
  fireEvent,
} from '../../../../configuration/renderer';
import PostList from '../PostList';
import posts from '../../../../../__fixtures__/posts';

describe('<PostList />', () => {
  it('renders correctly', async () => {
    const {toJSON} = render(<PostList />);

    await flushMicrotasksQueue();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when loading', async () => {
    const {toJSON} = render(<PostList />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders post titles', async () => {
    const {getByText} = render(<PostList />);

    const firstPost = await waitForElement(() => getByText(posts[0].title));

    expect(firstPost).toBeDefined();
  });

  it('should navigate to post detail when pressing an item on the list', async () => {
    const navigate = jest.fn();
    const postToCheck = posts[5];

    const {getByText} = render(<PostList navigation={{navigate}} />);

    await flushMicrotasksQueue();

    await waitForElement(() => fireEvent.press(getByText(postToCheck.title)));

    expect(navigate).toHaveBeenCalledWith({
      routeName: 'postDetail',
      params: {
        id: postToCheck.id,
        userId: postToCheck.userId,
      },
    });
  });
});
