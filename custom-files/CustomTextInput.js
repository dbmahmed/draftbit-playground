import { TextInput } from '@draftbit/ui';
export const Index = ({ StyleSheet, theme, dimensions }) => (
  <TextInput
    autoCapitalize={'none'}
    autoCorrect={true}
    changeTextDelay={500}
    webShowOutline={true}
    autoComplete={'password'}
    placeholder={'Password'}
    secureTextEntry={true}
    textContentType={'password'}
    style={StyleSheet.applyWidth(
      {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        fontFamily: 'System',
        fontWeight: '400',
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
      },
      dimensions.width
    )}
  />
);
