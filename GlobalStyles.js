import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { style: { color: theme.colors.text.strong }, props: {} },
  });

export const SVGStyles = theme =>
  StyleSheet.create({ SVG: { style: { height: 100, width: 100 }, props: {} } });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const CheckboxRowStyles = theme =>
  StyleSheet.create({
    'Checkbox Row': { style: { minHeight: 50 }, props: {} },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({
    'Action Sheet Item': { style: { textAlign: 'center' }, props: {} },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const CodeInputCellStyles = theme =>
  StyleSheet.create({
    'Code Input Cell': { style: { marginEnd: 5, marginStart: 5 }, props: {} },
  });

export const MapViewStyles = theme =>
  StyleSheet.create({
    'Map View': {
      style: { flex: 1, height: '100%', width: '100%' },
      props: {},
    },
  });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({
    'Image Background': { style: { height: '100%', width: '100%' }, props: {} },
  });

export const VideoPlayerStyles = theme =>
  StyleSheet.create({ Video: { style: { height: 215 }, props: {} } });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { style: { color: theme.colors.branding.primary }, props: {} },
  });

export const AudioPlayerStyles = theme =>
  StyleSheet.create({
    'Audio Player': {
      style: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 8,
      },
      props: {},
    },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });
