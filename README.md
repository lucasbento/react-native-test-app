# React Native TestApp

This project was bootstraped with `react-native init` on version `0.60.3` and includes the following libraries:

- [redux]
- [redux-saga]
- [react-native-testing-library]
- [redux-saga-test-plan]
- [react-navigation]
- [axios]
- [jest]
- [eslint-config-react-native-community]

## Installation

```sh
  yarn install
```

## Building

```sh
  react-native run-ios # for iOS
  react-native run-android # for Android
```

## Running tests

```sh
  yarn test
  open coverage/lcov-report/index.html # open coverage report
```

## Running lint

This project uses [ESLint] with the [eslint-config-react-native-community] configuration.

```sh
  yarn lint
```

## Caveats

- The `test` script is running with the `--silent` flag because of [this issue].

[redux]: https://github.com/reduxjs/redux
[redux-saga]: https://github.com/redux-saga/redux-saga
[redux-persist]: https://github.com/rt2zz/redux-persist
[react-native-testing-library]: https://github.com/callstack/react-native-testing-library
[redux-saga-test-plan]: https://github.com/jfairbank/redux-saga-test-plan
[react-navigation]: https://github.com/react-navigation/react-navigation
[axios]: https://github.com/axios/axios
[jest]: https://github.com/facebook/jest
[eslint-config-react-native-community]: https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community
[eslint]: https://github.com/eslint/eslint
[this issue]: https://github.com/callstack/react-native-testing-library/issues/200
