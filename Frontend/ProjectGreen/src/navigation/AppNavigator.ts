import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Auth from "./AuthNavigator";
import Main from "./MainNavigator";
import Register from "./RegisterNavigator";
import SelectServer from "./SelectServerNavigator";
import InitialLoading from "../screens/InitialLoading";

export default function createNavigation() {
  return createAppContainer(
    createSwitchNavigator(
      { Auth, Main, Register, SelectServer, InitialLoading },
      { initialRouteName: "InitialLoading" }
    )
  );
}
