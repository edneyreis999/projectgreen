import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen } from "../component/Home/HomeScreen";

export default createStackNavigator({
  Login: {
    screen: HomeScreen,
    navigationOptions: { header: null }
  }
});