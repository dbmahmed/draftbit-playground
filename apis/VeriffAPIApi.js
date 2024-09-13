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

export const createSessionPOST = async (
  Constants,
  {
    countryCode,
    dob,
    docType,
    documentNumber,
    fName,
    gender,
    lName,
    redirectUrl,
    userId,
  },
  handlers = {}
) => {
  const url = `https://stationapi.veriff.com/v1/sessions`;
  const options = {
    body: JSON.stringify({
      verification: {
        callback: redirectUrl,
        person: {
          firstName: fName,
          lastName: lName,
          gender: gender,
          dateOfBirth: dob,
        },
        document: {
          type: docType,
          country: countryCode,
          number: documentNumber,
        },
        vendorData: userId,
      },
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': '5855ce58-bddb-416e-b788-11d8b9a893a4',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateSessionPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createSessionPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('session', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('sessions');
      },
    }
  );
};

export const FetchCreateSessionPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  countryCode,
  dob,
  docType,
  documentNumber,
  fName,
  gender,
  lName,
  redirectUrl,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateSessionPOST(
    {
      countryCode,
      dob,
      docType,
      documentNumber,
      fName,
      gender,
      lName,
      redirectUrl,
      userId,
    },
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
  return children({ loading, data, error, refetchCreateSession: refetch });
};
