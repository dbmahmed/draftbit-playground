import { Text } from 'react-native';
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk';

export const MyPlaidComponent = ({ setToken }) => {
  return (
    <PlaidLink
      tokenConfig={{
        token: 'link-sandbox-eaae7ecb-1239-442c-8ddf-1e9765fe8051',
      }}
      onSuccess={success => {
        setToken(success.publicToken);
      }}
      onExit={exit => {
        console.log(exit);
      }}
    >
      <Text>Add Account</Text>
    </PlaidLink>
  );
};
