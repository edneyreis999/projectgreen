import React, { useEffect, useContext } from 'react';
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
import { IPlayerData } from '../../models/auth';
import { Endpoints } from '../../services/http/endpoints';

import { Button, Icon, Input, Select } from "../../components";
import { Images, argonTheme } from "../../constants";
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get("screen");

import styles from './styles'
import AuthenticationContext from '../../contexts/AuthenticationContext';

const singInBackgroundImage = require("../../assets/land/land_1.png");

export const SelectServerScreen: React.FunctionComponent<{}> = ({ }) => {
  const { navigate } = useNavigation();
  const { login: authenticate, isAuthenticated } = useContext(AuthenticationContext)

  const [{ data, loading, error }, useCitys] = useAxios<IPlayerData>({
    method: 'GET',
    url: Endpoints.Citys,
  }, { manual: true })

  useEffect(() => {
    if (data) {
      console.log('------ data --------')
      console.log(data)
    }
  }, [data])
  /*
                <Select
                defaultIndex={1}
                options={["01", "02", "03", "04", "05"]}
              />
  */
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={1} center>
              <ModalDropdown accessible={loading} options={['option 1', 'option 2']}>
              </ModalDropdown>
            </Block>
            <Block flex center>
              <Text>Press To Start</Text>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};
