import {createStackNavigator, createAppContainer} from 'react-navigation';
import PostList from './screens/posts/components/PostList';
import PostDetail from './screens/posts/components/PostDetail';

const Navigator = createAppContainer(
  createStackNavigator({
    postList: {
      screen: PostList,
    },
    postDetail: {
      screen: PostDetail,
    },
  }),
);

export default Navigator;
