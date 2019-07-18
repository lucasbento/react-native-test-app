import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';

const PostUser = ({name, username, company}) => (
  <Text style={styles.user}>
    By {name} (<Text style={styles.username}>@{username}</Text>) from{' '}
    {company.name}
  </Text>
);

PostUser.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  user: {
    marginTop: 7,
    color: '#7E7E7E',
  },
  username: {
    color: '#00B2FF',
  },
});

export default PostUser;
