import { createStackNavigator } from "react-navigation-stack";
import { RegisterScreen } from "../screens/Register/RegisterScreen";

export default createStackNavigator({
  Login: {
    screen: RegisterScreen,
    navigationOptions: { header: null }
  }
});