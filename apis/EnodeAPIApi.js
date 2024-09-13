import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const generateLinkPOST = async (Constants, { user }, handlers = {}) => {
  const url = `https://enode-api.sandbox.enode.io/users/${encodeQueryParam(
    user
  )}/link`;
  const options = {
    body: JSON.stringify({
      vendorType: 'vehicle',
      language: 'en-US',
      scopes: [
        'vehicle:read:data',
        'vehicle:read:location',
        'vehicle:control:charging',
      ],
      colorScheme: 'system',
      redirectUri: 'yourapp://integrations/enode',
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['ENODE_LINK_UI_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGenerateLinkPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['enodeAPIGenerateLinkPOST', args],
    () => generateLinkPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['enodeAPIGenerateLinkPOSTS']),
    }
  );
};

export const FetchGenerateLinkPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  user,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useGenerateLinkPOST(
    { user },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGenerateLink: refetch });
};
