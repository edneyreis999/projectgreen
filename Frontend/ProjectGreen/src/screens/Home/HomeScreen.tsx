import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card } from "react-native-elements";
import { useNavigation } from "react-navigation-hooks"
import { Buildings } from "../../constants/Images"


export const HomeScreen: React.FunctionComponent<{}> = ({ }) => {
  const { navigate } = useNavigation();
  const buildings = [
    {
      "_id": "5d8060277631e53fdcfcf8b6",
      "type": "Factory",
      "level": 4,
      "home": "5d8060107631e53fdcfcf8b5",
      "createdOn": "2019-09-17T04:25:11.217Z",
      "modifiedOn": "2019-10-01T17:03:23.457Z",
      "__v": 0
    },
    {
      "_id": "5d8060277631e53fdcfcf8b6",
      "type": "Store",
      "level": 1,
      "home": "5d8060107631e53fdcfcf8b5",
      "createdOn": "2019-09-17T04:25:11.217Z",
      "modifiedOn": "2019-10-01T17:03:23.457Z",
      "__v": 0
    },
    {
      "_id": "5d8060277631e53fdcfcf8b6",
      "type": "Warehouse",
      "level": 1,
      "home": "5d8060107631e53fdcfcf8b5",
      "createdOn": "2019-09-17T04:25:11.217Z",
      "modifiedOn": "2019-10-01T17:03:23.457Z",
      "__v": 0
    }
  ]
  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 2,
    }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <View>
          <Text>Home Carai</Text>
        </View>
        <Card title='Factory' image={Buildings.Factory}>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
          </Text>
          <Button
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <View>
          <Button title="Back Login"
            onPress={() => {
              console.log(this.props)
              navigate("Auth")
            }} />
        </View>
      </View>
    </ScrollView>
  );
};
