import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Auth from "./AuthNavigator";
import Main from "./MainNavigator";

export default function createNavigation(isSignedIn: boolean) {
  return createAppContainer(
    createSwitchNavigator(
      { Auth, Main },
      { initialRouteName: isSignedIn === true ? "Main" : "Auth" }
    )
  );
}
