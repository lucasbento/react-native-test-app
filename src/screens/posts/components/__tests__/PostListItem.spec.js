import React from 'react';
import {
  render,
  shallow,
  waitForElement,
  fireEvent,
} from '../../../../configuration/renderer';
import PostListItem from '../PostListItem';
import post from '../../../../../__fixtures__/post';

describe('<PostListItem />', () => {
  beforeEach(() => {
    this.props = {
      title: post.title,
      onPress: jest.fn(),
    };
  });

  it('renders correctly', async () => {
    const {output} = shallow(<PostListItem {...this.props} />);

    expect(output).toMatchSnapshot();
  });

  it('renders post title', async () => {
    const {getByText} = render(<PostListItem {...this.props} />);

    const title = await waitForElement(() => getByText(this.props.title));

    expect(title).toBeDefined();
  });

  it('calls `onPress` callback when pressed', async () => {
    const {getByText} = render(<PostListItem {...this.props} />);

    await waitForElement(() => fireEvent.press(getByText(this.props.title)));

    expect(this.props.onPress).toHaveBeenCalled();
    expect(this.props.onPress).toHaveBeenCalledTimes(1);
  });
});
