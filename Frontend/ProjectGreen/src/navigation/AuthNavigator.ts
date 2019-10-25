import { createStackNavigator } from "react-navigation-stack";

import { LoginScreen } from "../screens/Auth/LoginScreen";

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  }
});