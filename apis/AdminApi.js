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

export const dELETE$appSettings$$$appSettingsId$$DELETE = async (
  Constants,
  { app_settings_id },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/app_settings/${encodeQueryParam(
    app_settings_id
  )}`;
  const options = { method: 'DELETE' };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDELETE$appSettings$$$appSettingsId$$DELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      dELETE$appSettings$$$appSettingsId$$DELETE(
        Constants,
        { ...initialArgs, ...args },
        handlers
      ),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('app_settings', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('app_setting');
        queryClient.invalidateQueries('app_settings');
      },
    }
  );
};

export const dELETE$gmAdmin$$$gmAdminId$$DELETE = async (
  Constants,
  { gm_admin_id },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_admin/${encodeQueryParam(
    gm_admin_id
  )}`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
    method: 'DELETE',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDELETE$gmAdmin$$$gmAdminId$$DELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      dELETE$gmAdmin$$$gmAdminId$$DELETE(
        Constants,
        { ...initialArgs, ...args },
        handlers
      ),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('gm_admin', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('gm_admin');
        queryClient.invalidateQueries('gm_admins');
      },
    }
  );
};

export const gET$appSettingsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/app_settings`;
  const res = await fetch(url);
  return handleResponse(res, handlers);
};

export const useGET$appSettingsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$appSettingsGET', args],
    () => gET$appSettingsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$appSettingsGETS']),
    }
  );
};

export const FetchGET$appSettingsGET = ({
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
  } = useGET$appSettingsGET(
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
  return children({ loading, data, error, refetchGET$appSettings: refetch });
};

export const gET$appSettings$$$appSettingsId$$GET = async (
  Constants,
  { app_settings_id },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/app_settings/${encodeQueryParam(
    app_settings_id
  )}`;
  const res = await fetch(url);
  return handleResponse(res, handlers);
};

export const useGET$appSettings$$$appSettingsId$$GET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['app_setting', args],
    () => gET$appSettings$$$appSettingsId$$GET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['app_settings']),
    }
  );
};

export const FetchGET$appSettings$$$appSettingsId$$GET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  app_settings_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$appSettings$$$appSettingsId$$GET(
    { app_settings_id },
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
  return children({
    loading,
    data,
    error,
    refetchGET$appSettings$$$appSettingsId$$: refetch,
  });
};

export const gET$dashboardGET = async (
  Constants,
  { end_date, game, start_date },
  handlers = {}
) => {
  const paramsDict = {};
  if (start_date !== undefined) {
    paramsDict['start_date'] = renderParam(start_date);
  }
  if (end_date !== undefined) {
    paramsDict['end_date'] = renderParam(end_date);
  }
  if (game !== undefined) {
    paramsDict['game'] = renderParam(game);
  }
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/dashboard${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$dashboardGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$dashboardGET', args],
    () => gET$dashboardGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$dashboardGETS']),
    }
  );
};

export const FetchGET$dashboardGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  end_date,
  game,
  start_date,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$dashboardGET(
    { end_date, game, start_date },
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
  return children({ loading, data, error, refetchGET$dashboard: refetch });
};

export const gET$dashboardCountsGET = async (
  Constants,
  _args,
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/dashboard_counts`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$dashboardCountsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$dashboardCountsGET', args],
    () => gET$dashboardCountsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$dashboardCountsGETS']),
    }
  );
};

export const FetchGET$dashboardCountsGET = ({
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
  } = useGET$dashboardCountsGET(
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
  return children({
    loading,
    data,
    error,
    refetchGET$dashboardCounts: refetch,
  });
};

export const gET$gameRequestGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/game_request`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$gameRequestGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$gameRequestGET', args],
    () => gET$gameRequestGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$gameRequestGETS']),
    }
  );
};

export const FetchGET$gameRequestGET = ({
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
  } = useGET$gameRequestGET(
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
  return children({ loading, data, error, refetchGET$gameRequest: refetch });
};

export const gET$getUnseenNotificationsCountGET = async (
  Constants,
  _args,
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/get_unseen_notifications_count`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$getUnseenNotificationsCountGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$getUnseenNotificationsCountGET', args],
    () => gET$getUnseenNotificationsCountGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries([
          'adminGET$getUnseenNotificationsCountGETS',
        ]),
    }
  );
};

export const FetchGET$getUnseenNotificationsCountGET = ({
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
  } = useGET$getUnseenNotificationsCountGET(
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
  return children({
    loading,
    data,
    error,
    refetchGET$getUnseenNotificationsCount: refetch,
  });
};

export const gET$gmAdminGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_admin`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$gmAdminGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$gmAdminGET', args],
    () => gET$gmAdminGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['adminGET$gmAdminGETS']),
    }
  );
};

export const FetchGET$gmAdminGET = ({
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
  } = useGET$gmAdminGET(
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
  return children({ loading, data, error, refetchGET$gmAdmin: refetch });
};

export const gET$gmAdmin$$$gmAdminId$$GET = async (
  Constants,
  { gm_admin_id },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_admin/${encodeQueryParam(
    gm_admin_id
  )}`;
  const res = await fetch(url);
  return handleResponse(res, handlers);
};

export const useGET$gmAdmin$$$gmAdminId$$GET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$gmAdmin$$$gmAdminId$$GET', args],
    () => gET$gmAdmin$$$gmAdminId$$GET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$gmAdmin$$$gmAdminId$$GETS']),
    }
  );
};

export const FetchGET$gmAdmin$$$gmAdminId$$GET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  gm_admin_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$gmAdmin$$$gmAdminId$$GET(
    { gm_admin_id },
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
  return children({
    loading,
    data,
    error,
    refetchGET$gmAdmin$$$gmAdminId$$: refetch,
  });
};

export const gET$gmNotificationsGET = async (
  Constants,
  _args,
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_notifications`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$gmNotificationsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$gmNotificationsGET', args],
    () => gET$gmNotificationsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$gmNotificationsGETS']),
    }
  );
};

export const FetchGET$gmNotificationsGET = ({
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
  } = useGET$gmNotificationsGET(
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
  return children({
    loading,
    data,
    error,
    refetchGET$gmNotifications: refetch,
  });
};

export const gET$gmNotificationsPaginatedGET = async (
  Constants,
  { page },
  handlers = {}
) => {
  const paramsDict = {};
  if (page !== undefined) {
    paramsDict['page'] = renderParam(page);
  }
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_notifications_paginated${renderQueryString(
    paramsDict
  )}`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$gmNotificationsPaginatedGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$gmNotificationsPaginatedGET', args],
    () => gET$gmNotificationsPaginatedGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries([
          'adminGET$gmNotificationsPaginatedGETS',
        ]),
    }
  );
};

export const FetchGET$gmNotificationsPaginatedGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  page,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$gmNotificationsPaginatedGET(
    { page },
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
  return children({
    loading,
    data,
    error,
    refetchGET$gmNotificationsPaginated: refetch,
  });
};

export const gET$markAsSeenGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/mark_as_seen`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$markAsSeenGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$markAsSeenGET', args],
    () => gET$markAsSeenGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$markAsSeenGETS']),
    }
  );
};

export const FetchGET$markAsSeenGET = ({
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
  } = useGET$markAsSeenGET(
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
  return children({ loading, data, error, refetchGET$markAsSeen: refetch });
};

export const gET$sidebarCountsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/sidebar_counts`;
  const options = {
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$sidebarCountsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$sidebarCountsGET', args],
    () => gET$sidebarCountsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$sidebarCountsGETS']),
    }
  );
};

export const FetchGET$sidebarCountsGET = ({
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
  } = useGET$sidebarCountsGET(
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
  return children({ loading, data, error, refetchGET$sidebarCounts: refetch });
};

export const gET$testEndpointGET = async (Constants, { id }, handlers = {}) => {
  const paramsDict = {};
  if (id !== undefined) {
    paramsDict['id'] = renderParam(id);
  }
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/test_endpoint${renderQueryString(
    paramsDict
  )}`;
  const res = await fetch(url);
  return handleResponse(res, handlers);
};

export const useGET$testEndpointGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminGET$testEndpointGET', args],
    () => gET$testEndpointGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminGET$testEndpointGETS']),
    }
  );
};

export const FetchGET$testEndpointGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$testEndpointGET(
    { id },
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
  return children({ loading, data, error, refetchGET$testEndpoint: refetch });
};

export const pOST$appSettingsPOST = async (
  Constants,
  { ban_time, donation_amount, min_wait_time, referral_amount },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/app_settings`;
  const options = {
    body: JSON.stringify({
      ban_time: ban_time,
      min_wait_time: min_wait_time,
      donation_amount: donation_amount,
      referral_amount: referral_amount,
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$appSettingsPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      pOST$appSettingsPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('app_settings', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('app_setting');
        queryClient.invalidateQueries('app_settings');
      },
    }
  );
};

export const FetchPOST$appSettingsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  ban_time,
  donation_amount,
  min_wait_time,
  referral_amount,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = usePOST$appSettingsPOST(
    { ban_time, donation_amount, min_wait_time, referral_amount },
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
  return children({ loading, data, error, refetchPOST$appSettings: refetch });
};

export const pOST$appSettings$$$appSettingsId$$POST = async (
  Constants,
  {
    app_settings_id,
    ban_time,
    donation_amount,
    min_wait_time,
    referral_amount,
  },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/app_settings/${encodeQueryParam(
    app_settings_id
  )}`;
  const options = {
    body: JSON.stringify({
      ban_time: ban_time,
      min_wait_time: min_wait_time,
      donation_amount: donation_amount,
      referral_amount: referral_amount,
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$appSettings$$$appSettingsId$$POST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$appSettings$$$appSettingsId$$POST', args],
    () => pOST$appSettings$$$appSettingsId$$POST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries([
          'adminPOST$appSettings$$$appSettingsId$$POSTS',
        ]),
    }
  );
};

export const FetchPOST$appSettings$$$appSettingsId$$POST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  app_settings_id,
  ban_time,
  donation_amount,
  min_wait_time,
  referral_amount,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$appSettings$$$appSettingsId$$POST(
    {
      app_settings_id,
      ban_time,
      donation_amount,
      min_wait_time,
      referral_amount,
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
  return children({
    loading,
    data,
    error,
    refetchPOST$appSettings$$$appSettingsId$$: refetch,
  });
};

export const pOST$auth$loginPOST = async (
  Constants,
  { email, password },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/auth/login`;
  const options = {
    body: JSON.stringify({ email: email, password: password }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$auth$loginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['auth', args],
    () => pOST$auth$loginPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['auths']),
    }
  );
};

export const FetchPOST$auth$loginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = usePOST$auth$loginPOST(
    { email, password },
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
  return children({ loading, data, error, refetchPOST$auth$login: refetch });
};

export const pOST$auth$signupPOST = async (
  Constants,
  { email, password },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/auth/signup`;
  const options = {
    body: JSON.stringify({ email: email, password: password }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$auth$signupPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$auth$signupPOST', args],
    () => pOST$auth$signupPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminPOST$auth$signupPOSTS']),
    }
  );
};

export const FetchPOST$auth$signupPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$auth$signupPOST(
    { email, password },
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
  return children({ loading, data, error, refetchPOST$auth$signup: refetch });
};

export const pOST$gmAdminPOST = async (
  Constants,
  { emailId, password },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_admin`;
  const options = {
    body: JSON.stringify({ emailId: emailId, password: password }),
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$gmAdminPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$gmAdminPOST', args],
    () => pOST$gmAdminPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminPOST$gmAdminPOSTS']),
    }
  );
};

export const FetchPOST$gmAdminPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  emailId,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$gmAdminPOST(
    { emailId, password },
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
  return children({ loading, data, error, refetchPOST$gmAdmin: refetch });
};

export const pOST$gmAdmin$$$gmAdminId$$POST = async (
  Constants,
  { admin_user_id, email, gm_admin_id, last_login, password, role, status },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/gm_admin/${encodeQueryParam(
    gm_admin_id
  )}`;
  const options = {
    body: JSON.stringify({
      admin_user_id: admin_user_id,
      email: email,
      password: password,
      last_login: last_login,
      status: status,
      role: role,
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$gmAdmin$$$gmAdminId$$POST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$gmAdmin$$$gmAdminId$$POST', args],
    () => pOST$gmAdmin$$$gmAdminId$$POST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminPOST$gmAdmin$$$gmAdminId$$POSTS']),
    }
  );
};

export const FetchPOST$gmAdmin$$$gmAdminId$$POST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  admin_user_id,
  email,
  gm_admin_id,
  last_login,
  password,
  role,
  status,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$gmAdmin$$$gmAdminId$$POST(
    { admin_user_id, email, gm_admin_id, last_login, password, role, status },
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
  return children({
    loading,
    data,
    error,
    refetchPOST$gmAdmin$$$gmAdminId$$: refetch,
  });
};

export const pOST$markIdsAsSeenPOST = async (
  Constants,
  { ids },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/mark_ids_as_seen`;
  const options = {
    body: JSON.stringify({ ids: ids }),
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$markIdsAsSeenPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$markIdsAsSeenPOST', args],
    () => pOST$markIdsAsSeenPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminPOST$markIdsAsSeenPOSTS']),
    }
  );
};

export const FetchPOST$markIdsAsSeenPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  ids,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$markIdsAsSeenPOST(
    { ids },
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
  return children({ loading, data, error, refetchPOST$markIdsAsSeen: refetch });
};

export const pOST$sendNotificationsPOST = async (
  Constants,
  { body, title },
  handlers = {}
) => {
  const url = `https://xfie-awg5-rjfa.n7c.xano.io/api:ye9PF9qK/send_notifications`;
  const options = {
    body: JSON.stringify({ title: title, body: body }),
    headers: cleanHeaders({ Authorization: Constants['Bearer Token'] }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$sendNotificationsPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['adminPOST$sendNotificationsPOST', args],
    () => pOST$sendNotificationsPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['adminPOST$sendNotificationsPOSTS']),
    }
  );
};

export const FetchPOST$sendNotificationsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  body,
  title,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$sendNotificationsPOST(
    { body, title },
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
  return children({
    loading,
    data,
    error,
    refetchPOST$sendNotifications: refetch,
  });
};
