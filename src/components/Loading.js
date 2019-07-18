import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
