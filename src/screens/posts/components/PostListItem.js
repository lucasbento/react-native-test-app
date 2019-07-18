import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import ArrowRight from '../../../assets/arrow-right.png';

const PostListItem = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.title}>{title}</Text>

    <Image source={ArrowRight} style={styles.arrowRightIcon} />
  </TouchableOpacity>
);

PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 15,
  },
  arrowRightIcon: {
    width: 10,
    height: 20,
    resizeMode: 'contain',
  },
});

export default PostListItem;
