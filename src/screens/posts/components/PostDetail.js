import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PostActions from '../store/PostActions';
import Loading from '../../../components/Loading';
import PostUser from './PostUser';

const PostDetail = ({navigation, actions, isFetchPostLoading, post}) => {
  useEffect(() => {
    const id = navigation.getParam('id');
    const userId = navigation.getParam('userId');

    actions.fetchPostRequest({id, userId});
  }, [actions, navigation]);

  useEffect(
    () => () => {
      console.log(actions);
      // This is here for when the user opens this screen again it doesn't
      // blink on first render
      actions.resetLastFetchedPost();
    },
    [actions],
  );

  if (isFetchPostLoading) {
    return <Loading />;
  }

  const {title, body, user} = post;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <PostUser
        name={user.name}
        username={user.username}
        company={user.company}
      />

      <Text style={styles.body}>{body}</Text>
    </ScrollView>
  );
};

PostDetail.navigationOptions = ({navigation}) => ({
  title: `Post ${navigation.getParam('id')}`,
});

PostDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    marginTop: 20,
  },
});

const mapStateToProps = ({post}) => ({
  isFetchPostLoading: post.isFetchPostLoading,
  post: post.post,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchPostRequest: ({id, userId}) =>
      dispatch(PostActions.fetchPostRequest({id, userId})),
    resetLastFetchedPost: () => dispatch(PostActions.resetLastFetchedPost()),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
