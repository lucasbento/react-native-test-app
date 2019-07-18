import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import PostActions from '../store/PostActions';
import Loading from '../../../components/Loading';
import PostListItem from './PostListItem';

const PostList = ({actions, isFetchPostsLoading, navigation, posts}) => {
  useEffect(() => {
    actions.fetchPostsRequest();
  }, [actions]);

  if (isFetchPostsLoading) {
    return <Loading />;
  }

  const openPostDetail = ({id, userId}) => () =>
    navigation.navigate({
      routeName: 'postDetail',
      params: {
        id,
        userId,
      },
    });

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <PostListItem
          {...item}
          onPress={openPostDetail({id: item.id, userId: item.userId})}
        />
      )}
    />
  );
};

PostList.navigationOptions = {
  title: 'Posts',
};

PostList.propTypes = {
  actions: PropTypes.shape({
    fetchPostsRequest: PropTypes.func,
  }).isRequired,
  isFetchPostsLoading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};

PropTypes.defaultProps = {
  posts: undefined,
};

const mapStateToProps = ({post}) => ({
  isFetchPostsLoading: post.isFetchPostsLoading,
  posts: post.posts,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchPostsRequest: () => dispatch(PostActions.fetchPostsRequest()),
  },
});

export {PostList};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
