import React, { useEffect, useContext, useState } from 'react';
import useAxios from 'axios-hooks'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { useNavigation } from "react-navigation-hooks"
import { AsyncStorage } from 'react-native'
import { Endpoints } from '../../services/http/endpoints';

import { Button, Icon, Input, Select } from "../../components";
import { Images, argonTheme } from "../../constants";
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get("screen");

import styles from './styles'
import GameContext from '../../contexts/GameContext';
import { ICity } from '../../models/game';

export const SelectServerScreen: React.FunctionComponent<{}> = ({ }) => {
  const { navigate } = useNavigation();
  const { initGame } = useContext(GameContext)

  const [{ data, loading, error }] = useAxios<ICity[]>({
    method: 'GET',
    url: Endpoints.Citys,
  })

  useEffect(() => {
    if(data){
      console.log('---- data citys da API ----')
      console.log(data)
    }
  }, [data])

  const [selectedServer, setSelectedServer] = useState<ICity>(null);

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            {
              loading ? (
                <Block flex middle center>
                  <Text>Loading</Text>
                </Block>
              ) :
                (
                  <Block flex>
                    <Block flex={0.2} center>
                      <Block middle center>
                        <ModalDropdown
                          textStyle={{ fontSize: 20 }}
                          dropdownTextStyle={{ fontSize: 20, color: argonTheme.COLORS.BLACK }}
                          options={data.map((city: ICity) => `${city.displayName} (${city.speed}x)`)}
                          onSelect={(index, value) => {
                            let selectedCity = data[index];
                            setSelectedServer(selectedCity)
                          }}
                        >
                        </ModalDropdown>
                      </Block>
                    </Block>
                    <TouchableOpacity style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}
                      onPress={async () => {
                        if (selectedServer) {
                          initGame(selectedServer);
                        }
                      }}>
                      <Text>Press To Start</Text>
                    </TouchableOpacity>
                  </Block>
                )
            }

          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};
