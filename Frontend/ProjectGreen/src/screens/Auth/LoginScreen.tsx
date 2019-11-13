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
import { IPlayerData } from '../../models/auth';
import { Endpoints } from '../../services/http/endpoints';

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

import styles from './styles'
import AuthenticationContext from '../../contexts/AuthenticationContext';

const singInBackgroundImage = require("../../assets/land/land_1.png");

export const LoginScreen: React.FunctionComponent<{}> = ({ }) => {
  const { navigate } = useNavigation();
  const { login: authenticate, isAuthenticated } = useContext(AuthenticationContext)

  const [{ data: playerData, loading, error }, login] = useAxios<IPlayerData>({
    method: 'POST',
    url: Endpoints.SignIn,
  }, { manual: true })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  useEffect(() => {
    if (playerData) {
      authenticate(playerData)
    }
  }, [playerData])

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign in with
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button style={styles.socialButtons}>
                  <Block row>
                    <Icon
                      name="logo-google"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GOOGLE</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex={0.75}>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      onChangeText={(value: string) => setEmail(value)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      onChangeText={(value: string) => setPassword(value)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={() => {
                      login({
                        data: {
                          "email": email,
                          "password": password,
                        }
                      })
                    }}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGIN
                      </Text>
                    </Button>
                  </Block>
                  <Block right style={{ marginTop: 25 }}>
                    <TouchableOpacity onPress={() => navigate("Register")}>
                      <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                        REGISTER NOW
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};
