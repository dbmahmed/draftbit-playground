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

export const iosGetOfferingsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://api.revenuecat.com/v1/subscribers/test/offerings`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Platform': 'ios',
      authorization: 'appl_ykoXtgdaPnVqLrlygZcqyIpVGlV',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useIosGetOfferingsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['revenueCatIosGetOfferingsGET', args],
    () => iosGetOfferingsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['revenueCatIosGetOfferingsGETS']),
    }
  );
};

export const FetchIosGetOfferingsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useIosGetOfferingsGET(
    {},
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
  return children({ loading, data, error, refetchIosGetOfferings: refetch });
};
