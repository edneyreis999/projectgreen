import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks"

export const LoginScreen: React.FunctionComponent<{}> = ({ }) => {
  const { navigate } = useNavigation()
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 2,
    }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <View>
          <Text>Login carai</Text>
        </View>
        <View>
          <Button title="Login"
            onPress={() => {
              console.log(this.props)
              navigate("Main")
            }} />
        </View>

      </View>
    </ScrollView>
  );
};
