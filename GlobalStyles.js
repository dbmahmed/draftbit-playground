import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({ 'Action Sheet Item': { textAlign: 'center' } });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const CheckboxRowStyles = theme =>
  StyleSheet.create({ 'Checkbox Row': { minHeight: 50 } });

export const CodeInputCellStyles = theme =>
  StyleSheet.create({ 'Code Input Cell': { marginEnd: 5, marginStart: 5 } });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { minHeight: 40 } });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { height: '100%', width: '100%' } });

export const MapViewStyles = theme =>
  StyleSheet.create({ 'Map View': { flex: 1, height: '100%', width: '100%' } });

export const SVGStyles = theme =>
  StyleSheet.create({ SVG: { height: 100, width: 100 } });

export const TextStyles = theme =>
  StyleSheet.create({ Text: { color: theme.colors.strong } });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });
