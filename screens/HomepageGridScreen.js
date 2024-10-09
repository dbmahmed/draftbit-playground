import React from 'react';
import {
  Icon,
  KeyboardAvoidingView,
  ScreenContainer,
  Square,
  Stepper,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ScrollView, Text, View } from 'react-native';
import Purchases from 'react-native-purchases';
import { Fetch } from 'react-request';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomepageGridScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [stepperValue, setStepperValue] = React.useState(0);

  return (
    <ScreenContainer hasSafeArea={true} scrollable={true}>
      <KeyboardAvoidingView
        behavior={'position'}
        enabled={false}
        keyboardVerticalOffset={44}
        style={StyleSheet.applyWidth(
          {
            alignSelf: 'stretch',
            backgroundColor: 'theme.colors.custom_rgba141_141_141_0',
            flexGrow: 1,
            justifyContent: 'space-around',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              marginLeft: 16,
              marginRight: 16,
              paddingBottom: 14,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 32,
            },
            dimensions.width
          )}
        >
          {/* Test */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.text.strong,
                textAlign: 'center',
                typography: theme.typography.headline4,
              },
              dimensions.width
            )}
          >
            {null}
            {'Escolha uma das opões abaixo'}
          </Text>
          {/* Section Header */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 14,
                marginTop: 24,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              ellipsizeMode={'tail'}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  typography: theme.typography.headline5,
                },
                dimensions.width
              )}
              textBreakStrategy={'highQuality'}
            >
              {'메뉴'}
            </Text>

            <Touchable
              style={StyleSheet.applyWidth(
                { alignSelf: 'flex-end', justifyContent: 'center' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                ellipsizeMode={'tail'}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.branding.primary,
                    typography: theme.typography.headline5,
                  },
                  dimensions.width
                )}
                textBreakStrategy={'highQuality'}
              >
                {'See All'}
              </Text>
            </Touchable>
          </View>
          <Stepper
            iconColor={theme.colors.text.strong}
            iconSize={24}
            onChange={newStepperValue => {
              const stepperValue = newStepperValue;
              try {
                setValue(value);
              } catch (err) {
                console.error(err);
              }
            }}
            value={stepperValue}
          />
        </View>
        {/* browse-grid */}
        <View
          needsOffscreenAlphaCompositing={false}
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingBottom: 72,
              paddingLeft: 32,
              paddingRight: 32,
            },
            dimensions.width
          )}
        >
          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'To Do'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'Entypo/bar-graph'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
              {/* Fetch component: no endpoint configured */ null}
            </View>
          </Touchable>

          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'Title'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'AntDesign/heart'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>

          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'Send Pool to Friends'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'Foundation/plus'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>

          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'Title'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'Ionicons/body'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>

          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'Title'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'MaterialCommunityIcons/power-sleep'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>

          <Touchable
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'stretch',
                marginBottom: 14,
                marginTop: 14,
                width: '45%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  backgroundColor: theme.colors.background.brand,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.border.brand,
                  borderLeftWidth: 1,
                  borderRadius: 6,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 140,
                  justifyContent: 'space-around',
                  paddingBottom: 14,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 14,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 24 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      textAlign: 'left',
                      typography: theme.typography.headline6,
                    },
                    dimensions.width
                  )}
                >
                  {'Title'}
                </Text>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.medium,
                      textAlign: 'left',
                      typography: theme.typography.subtitle1,
                    },
                    dimensions.width
                  )}
                >
                  {'Description'}
                </Text>
              </View>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    height: 42,
                    justifyContent: 'center',
                    width: 42,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  size={24}
                  color={theme.colors.text.strong}
                  name={'MaterialIcons/visibility'}
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>
          <ScrollView
            bounces={true}
            horizontal={false}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
          />
          <Square bgColor={theme.colors.text.light} size={50} />
          <Square bgColor={theme.colors.text.light} size={50} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default withTheme(HomepageGridScreen);
