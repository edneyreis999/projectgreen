import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoginScreen } from "../component/Auth/LoginScreen";

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  }
});