import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomCode from '../custom-files/CustomCode';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useWindowDimensions } from 'react-native';

const Web3AuthDemoScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const modify = item => {
    if (item) {
      const found = tagsArray.find(el => el[1] === item.sku);
      if (found) {
        setTagsArray(tagsArray.filter(el => el[1] !== item.sku));
      } else {
        setTagsArray([...tagsArray, [Date.now(), item.sku]]);
      }
    }
  };

  const modifyGlobal = (Variables, item) => {
    if (item) {
      const found = Variables.TAGS_ARRAY.find(el => el[1] === item.sku);
      if (found) {
        return Variables.TAGS_ARRAY.filter(el => el[1] !== item.sku);
      } else {
        return [...Variables.TAGS_ARRAY, [Date.now(), item.sku]];
      }
    }
  };

  const { theme } = props;

  const [tagsArray, setTagsArray] = React.useState([]);
  const [token, setToken] = React.useState('');

  return <ScreenContainer scrollable={false} hasSafeArea={false} />;
};

export default withTheme(Web3AuthDemoScreen);
