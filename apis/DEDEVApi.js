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
import * as GlobalVariables from '../config/GlobalVariableContext';

export const getVehiclePOST = (
  Constants,
  { query, start, stop, vin },
  handlers = {}
) =>
  fetch(
    `https://demicroservicesdev.azure-api.net/Microservicesdev/querygraphql/`,
    {
      body: JSON.stringify({
        query: query,
        variables: { vin: vin, periodStart: start, periodStop: stop },
      }),
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Img1LTV5NmVNbERKM09ydXZJOUt6XzdNR3NxQ1NDenBnUHJycVVPbmQ2Y1UiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLWRldi5kcml2ZS1lbGVjdHJpYy5jby51ay90ZnAvYmFiYmEwOWItMGNjMy00Yzc1LWI2NzUtOGUzNTk1ZDU0YjJhL2IyY18xYV9zaWduaW4vdjIuMC8iLCJzdWIiOiI5OTRhNWQ5OC0zOWFiLTQ2ZTctYTQ5NS1iY2ZiZDdhMjQ3YmYiLCJhdWQiOiJjYjAwMzliNi1hMjQ1LTQwOTUtOTA1YS1mMjJhOTQ1NmJjYTUiLCJleHAiOjE3MDQzNzg2OTEsImlhdCI6MTcwNDM3NTA5MSwiYXV0aF90aW1lIjoxNzA0Mzc1MDkwLCJlbWFpbCI6ImJlbi5wb3R0ZXJAY3Jvd2QtY2hhcmdlLmNvbSIsIm5hbWUiOiJCZW4gUG90dGVyIiwiZ2l2ZW5fbmFtZSI6IkJlbiIsImZhbWlseV9uYW1lIjoiUG90dGVyIiwiY29udGFjdElkIjoiNjBmYmUxMTktZDJmMy1lZDExLTg4NDgtMDAyMjQ4MWJkN2Y0Iiwicm9sZXMiOlsiUFJPIEh1YiBEZWNpc2lvbiBNYWtlciIsIlBSTyBIdWIgRHJpdmVyIl0sInRpZCI6ImJhYmJhMDliLTBjYzMtNGM3NS1iNjc1LThlMzU5NWQ1NGIyYSIsInRmcCI6IkIyQ18xQV9TaWduSW4iLCJuYmYiOjE3MDQzNzUwOTF9.SWJpOirCyzMfUnEh1UoZv-bW0AyzZo8z33KZR7igh8p4XW3zBlaX33DTAnaXweZpTTbRORv1i1hVI5hp9z-xkW2tv_GIoeULY5_rP8eaeuNnM6gOmuEkRwFYAiUPxsXPx-luYqvL97Ux-0AQo7qGS9_OK_QYX9yGEMs28uCSzSH2GRq4sf9qq-c9LCmsHaXRF9hbYibqWT9BSH4VH4p67e4DDa79AwghboFG5rk3OgFH7atHRmyPa3lx_RmPQWkPq3j4Us0e1KR06YACIV3vi4oW-gc2IO9waVn3sV84PsGfT8P_JygzsW-r_DTvhtxg0-aNxl7FA3NFkIwD9QRa0w',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '08bb948c6cae4cdea6bc92adca15d2b4',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const useGetVehiclePOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['vehicle', args],
    () => getVehiclePOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['vehicles']),
    }
  );
};

export const FetchGetVehiclePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  query,
  start,
  stop,
  vin,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetVehiclePOST(
    { query, start, stop, vin },
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
  return children({ loading, data, error, refetchGetVehicle: refetch });
};
