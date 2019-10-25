import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen } from "../screens/Home/HomeScreen";

export default createStackNavigator({
  Login: {
    screen: HomeScreen,
    navigationOptions: { header: null }
  }
});