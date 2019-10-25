import { createStackNavigator } from "react-navigation-stack";
import { SelectServerScreen } from "../screens/SelectServer/SelectServerScreen";

export default createStackNavigator({
  Login: {
    screen: SelectServerScreen,
    navigationOptions: { header: null }
  }
});