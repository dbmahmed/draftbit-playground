"use strict";

/* eslint-env serviceworker */

/**
 * This file was ejected from expo via `expo customize:web`. The additions are
 * marked between DRAFTBIT CUSTOM comments. The rest of the code is generated by
 * expo, and we should consider upstreaming fixes, re-ejecting, and re-adding
 * our custom code versus just fixing here.
 *
 * This file is a service worker.  It is kept by the browser in its own global
 * context, separate from the page, and has several specific global API's
 * available, like `self`.
 *
 * If you are unfamiliar with service workers, you should considering talking to
 * someone who is before making changes. Many of your assumptions are incorrect.
 * For example, browsers may sleep execution of this file, so any timer you set
 * here is going to be break for users, but is very unlikely to break in
 * development because you'll usually be idleing on the page (and so the browser
 * is unlikely to sleep the worker).
 *
 * Some helpful references:
 *  - ../webpack.config.js (contains settings)
 *  - ./register-service-worker.js (configures behavior of worker lifecycle)
 *  - Workbox (webpack plugin that does most of the hard work)
 *    - https://developers.google.com/web/tools/workbox
 *  - Service Workers: An introduction (specifically the lifecycle page)
 *    - https://developers.google.com/web/fundamentals/primers/service-workers
 */

/**
 * Store notification icon string in service worker.
 * Ref: https://stackoverflow.com/a/35729334/2603230
 */
self.addEventListener("message", event => {
  /* BEGIN DRAFTBIT CUSTOM */
  if (event.data === "skipWaiting") {
    // Handle a request from the browser that we load the new version of the
    // app, that is, skip waiting for app to shutdown before loading the new
    // service worker.  This will trigger a page refresh.
    //
    // We return, because otherwise expo code below will pop this as a
    // notification.
    return skipWaiting();
  }
  /* END DRAFTBIT CUSTOM */


  let data;

  if (typeof event.data === "string") {
    try {
      data = JSON.parse(event.data);
    } catch (e) {}
  }

  if (data && data.fromExpoWebClient) {
    self.notificationIcon = data.fromExpoWebClient.notificationIcon;
  }
});
/**
 * Add support for push notification.
 */

self.addEventListener("push", event => {
  let payload = {};

  try {
    payload = event.data.json();
  } catch (e) {
    // If `event.data.text()` is not a JSON object, we just treat it
    // as a plain string and display it as the body.
    payload = {
      title: "",
      body: event.data.text()
    };
  }

  const title = payload.title;
  const data = payload.data || payload.custom || {};
  const options = {
    body: payload.body,
    data
  };
  options.icon = data._icon || payload.icon || self.notificationIcon || null;
  options.image = data._richContent && data._richContent.image ? options.data._richContent.image : payload.image;
  options.tag = data._tag || payload.collapseKey;

  if (options.tag) {
    options.renotify = data._renotify;
  }

  event.waitUntil(self.registration.showNotification(title, options));
}); // https://developer.mozilla.org/en-US/docs/Web/API/Clients

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({
      includeUncontrolled: true
    });
    let appClient;
    const path = event.notification.data._webPath || "/"; // If we already have a window open, use it.

    for (const client of allClients) {
      const url = new URL(client.url);

      if (url.pathname === path) {
        client.focus();
        appClient = client;
        break;
      }
    } // If there is no existing window, open a new one.


    if (!appClient) {
      appClient = await self.clients.openWindow(path);
    } // Message the client:
    // `origin` will always be `'selected'` in this case.
    // https://docs.expo.io/versions/latest/sdk/notifications/#notification


    appClient.postMessage({
      origin: "selected",
      data: event.notification.data,
      remote: !event.notification._isLocal
    });
  })());
}); // TODO: Consider cache: https://github.com/expo/expo-cli/pull/844#issuecomment-515619883
// Import the script generated by workbox.

self.importScripts("service-worker.js");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGF0YSIsInNraXBXYWl0aW5nIiwiSlNPTiIsInBhcnNlIiwiZSIsImZyb21FeHBvV2ViQ2xpZW50Iiwibm90aWZpY2F0aW9uSWNvbiIsInBheWxvYWQiLCJqc29uIiwidGl0bGUiLCJib2R5IiwidGV4dCIsImN1c3RvbSIsIm9wdGlvbnMiLCJpY29uIiwiX2ljb24iLCJpbWFnZSIsIl9yaWNoQ29udGVudCIsInRhZyIsIl90YWciLCJjb2xsYXBzZUtleSIsInJlbm90aWZ5IiwiX3Jlbm90aWZ5Iiwid2FpdFVudGlsIiwicmVnaXN0cmF0aW9uIiwic2hvd05vdGlmaWNhdGlvbiIsIm5vdGlmaWNhdGlvbiIsImNsb3NlIiwiYWxsQ2xpZW50cyIsImNsaWVudHMiLCJtYXRjaEFsbCIsImluY2x1ZGVVbmNvbnRyb2xsZWQiLCJhcHBDbGllbnQiLCJwYXRoIiwiX3dlYlBhdGgiLCJjbGllbnQiLCJ1cmwiLCJVUkwiLCJwYXRobmFtZSIsImZvY3VzIiwib3BlbldpbmRvdyIsInBvc3RNZXNzYWdlIiwib3JpZ2luIiwicmVtb3RlIiwiX2lzTG9jYWwiLCJpbXBvcnRTY3JpcHRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2ZpeHR1cmUtZXhwby13ZWItYnVpbGQtYm9pbGVycGxhdGUvd2ViL2V4cG8tc2VydmljZS13b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWVudiBzZXJ2aWNld29ya2VyICovXG5cbi8qKlxuICogVGhpcyBmaWxlIHdhcyBlamVjdGVkIGZyb20gZXhwbyB2aWEgYGV4cG8gY3VzdG9taXplOndlYmAuIFRoZSBhZGRpdGlvbnMgYXJlXG4gKiBtYXJrZWQgYmV0d2VlbiBEUkFGVEJJVCBDVVNUT00gY29tbWVudHMuIFRoZSByZXN0IG9mIHRoZSBjb2RlIGlzIGdlbmVyYXRlZCBieVxuICogZXhwbywgYW5kIHdlIHNob3VsZCBjb25zaWRlciB1cHN0cmVhbWluZyBmaXhlcywgcmUtZWplY3RpbmcsIGFuZCByZS1hZGRpbmdcbiAqIG91ciBjdXN0b20gY29kZSB2ZXJzdXMganVzdCBmaXhpbmcgaGVyZS5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgYSBzZXJ2aWNlIHdvcmtlci4gIEl0IGlzIGtlcHQgYnkgdGhlIGJyb3dzZXIgaW4gaXRzIG93biBnbG9iYWxcbiAqIGNvbnRleHQsIHNlcGFyYXRlIGZyb20gdGhlIHBhZ2UsIGFuZCBoYXMgc2V2ZXJhbCBzcGVjaWZpYyBnbG9iYWwgQVBJJ3NcbiAqIGF2YWlsYWJsZSwgbGlrZSBgc2VsZmAuXG4gKlxuICogSWYgeW91IGFyZSB1bmZhbWlsaWFyIHdpdGggc2VydmljZSB3b3JrZXJzLCB5b3Ugc2hvdWxkIGNvbnNpZGVyaW5nIHRhbGtpbmcgdG9cbiAqIHNvbWVvbmUgd2hvIGlzIGJlZm9yZSBtYWtpbmcgY2hhbmdlcy4gTWFueSBvZiB5b3VyIGFzc3VtcHRpb25zIGFyZSBpbmNvcnJlY3QuXG4gKiBGb3IgZXhhbXBsZSwgYnJvd3NlcnMgbWF5IHNsZWVwIGV4ZWN1dGlvbiBvZiB0aGlzIGZpbGUsIHNvIGFueSB0aW1lciB5b3Ugc2V0XG4gKiBoZXJlIGlzIGdvaW5nIHRvIGJlIGJyZWFrIGZvciB1c2VycywgYnV0IGlzIHZlcnkgdW5saWtlbHkgdG8gYnJlYWsgaW5cbiAqIGRldmVsb3BtZW50IGJlY2F1c2UgeW91J2xsIHVzdWFsbHkgYmUgaWRsZWluZyBvbiB0aGUgcGFnZSAoYW5kIHNvIHRoZSBicm93c2VyXG4gKiBpcyB1bmxpa2VseSB0byBzbGVlcCB0aGUgd29ya2VyKS5cbiAqXG4gKiBTb21lIGhlbHBmdWwgcmVmZXJlbmNlczpcbiAqICAtIC4uL3dlYnBhY2suY29uZmlnLmpzIChjb250YWlucyBzZXR0aW5ncylcbiAqICAtIC4vcmVnaXN0ZXItc2VydmljZS13b3JrZXIuanMgKGNvbmZpZ3VyZXMgYmVoYXZpb3Igb2Ygd29ya2VyIGxpZmVjeWNsZSlcbiAqICAtIFdvcmtib3ggKHdlYnBhY2sgcGx1Z2luIHRoYXQgZG9lcyBtb3N0IG9mIHRoZSBoYXJkIHdvcmspXG4gKiAgICAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94XG4gKiAgLSBTZXJ2aWNlIFdvcmtlcnM6IEFuIGludHJvZHVjdGlvbiAoc3BlY2lmaWNhbGx5IHRoZSBsaWZlY3ljbGUgcGFnZSlcbiAqICAgIC0gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9wcmltZXJzL3NlcnZpY2Utd29ya2Vyc1xuICovXG5cbi8qKlxuICogU3RvcmUgbm90aWZpY2F0aW9uIGljb24gc3RyaW5nIGluIHNlcnZpY2Ugd29ya2VyLlxuICogUmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzU3MjkzMzQvMjYwMzIzMFxuICovXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGV2ZW50ID0+IHtcbiAgLyogQkVHSU4gRFJBRlRCSVQgQ1VTVE9NICovXG4gIGlmIChldmVudC5kYXRhID09PSBcInNraXBXYWl0aW5nXCIpIHtcbiAgICAvLyBIYW5kbGUgYSByZXF1ZXN0IGZyb20gdGhlIGJyb3dzZXIgdGhhdCB3ZSBsb2FkIHRoZSBuZXcgdmVyc2lvbiBvZiB0aGVcbiAgICAvLyBhcHAsIHRoYXQgaXMsIHNraXAgd2FpdGluZyBmb3IgYXBwIHRvIHNodXRkb3duIGJlZm9yZSBsb2FkaW5nIHRoZSBuZXdcbiAgICAvLyBzZXJ2aWNlIHdvcmtlci4gIFRoaXMgd2lsbCB0cmlnZ2VyIGEgcGFnZSByZWZyZXNoLlxuICAgIC8vXG4gICAgLy8gV2UgcmV0dXJuLCBiZWNhdXNlIG90aGVyd2lzZSBleHBvIGNvZGUgYmVsb3cgd2lsbCBwb3AgdGhpcyBhcyBhXG4gICAgLy8gbm90aWZpY2F0aW9uLlxuICAgIHJldHVybiBza2lwV2FpdGluZygpO1xuICB9XG4gIC8qIEVORCBEUkFGVEJJVCBDVVNUT00gKi9cblxuICBsZXQgZGF0YTtcbiAgaWYgKHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpZiAoZGF0YSAmJiBkYXRhLmZyb21FeHBvV2ViQ2xpZW50KSB7XG4gICAgc2VsZi5ub3RpZmljYXRpb25JY29uID0gZGF0YS5mcm9tRXhwb1dlYkNsaWVudC5ub3RpZmljYXRpb25JY29uO1xuICB9XG59KTtcblxuLyoqXG4gKiBBZGQgc3VwcG9ydCBmb3IgcHVzaCBub3RpZmljYXRpb24uXG4gKi9cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcInB1c2hcIiwgZXZlbnQgPT4ge1xuICBsZXQgcGF5bG9hZCA9IHt9O1xuICB0cnkge1xuICAgIHBheWxvYWQgPSBldmVudC5kYXRhLmpzb24oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElmIGBldmVudC5kYXRhLnRleHQoKWAgaXMgbm90IGEgSlNPTiBvYmplY3QsIHdlIGp1c3QgdHJlYXQgaXRcbiAgICAvLyBhcyBhIHBsYWluIHN0cmluZyBhbmQgZGlzcGxheSBpdCBhcyB0aGUgYm9keS5cbiAgICBwYXlsb2FkID0geyB0aXRsZTogXCJcIiwgYm9keTogZXZlbnQuZGF0YS50ZXh0KCkgfTtcbiAgfVxuXG4gIGNvbnN0IHRpdGxlID0gcGF5bG9hZC50aXRsZTtcbiAgY29uc3QgZGF0YSA9IHBheWxvYWQuZGF0YSB8fCBwYXlsb2FkLmN1c3RvbSB8fCB7fTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBib2R5OiBwYXlsb2FkLmJvZHksXG4gICAgZGF0YSxcbiAgfTtcbiAgb3B0aW9ucy5pY29uID0gZGF0YS5faWNvbiB8fCBwYXlsb2FkLmljb24gfHwgc2VsZi5ub3RpZmljYXRpb25JY29uIHx8IG51bGw7XG4gIG9wdGlvbnMuaW1hZ2UgPVxuICAgIGRhdGEuX3JpY2hDb250ZW50ICYmIGRhdGEuX3JpY2hDb250ZW50LmltYWdlXG4gICAgICA/IG9wdGlvbnMuZGF0YS5fcmljaENvbnRlbnQuaW1hZ2VcbiAgICAgIDogcGF5bG9hZC5pbWFnZTtcbiAgb3B0aW9ucy50YWcgPSBkYXRhLl90YWcgfHwgcGF5bG9hZC5jb2xsYXBzZUtleTtcbiAgaWYgKG9wdGlvbnMudGFnKSB7XG4gICAgb3B0aW9ucy5yZW5vdGlmeSA9IGRhdGEuX3Jlbm90aWZ5O1xuICB9XG5cbiAgZXZlbnQud2FpdFVudGlsKHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24odGl0bGUsIG9wdGlvbnMpKTtcbn0pO1xuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xpZW50c1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibm90aWZpY2F0aW9uY2xpY2tcIiwgZXZlbnQgPT4ge1xuICBldmVudC5ub3RpZmljYXRpb24uY2xvc2UoKTtcblxuICBldmVudC53YWl0VW50aWwoXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFsbENsaWVudHMgPSBhd2FpdCBzZWxmLmNsaWVudHMubWF0Y2hBbGwoe1xuICAgICAgICBpbmNsdWRlVW5jb250cm9sbGVkOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBhcHBDbGllbnQ7XG5cbiAgICAgIGNvbnN0IHBhdGggPSBldmVudC5ub3RpZmljYXRpb24uZGF0YS5fd2ViUGF0aCB8fCBcIi9cIjtcblxuICAgICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIGEgd2luZG93IG9wZW4sIHVzZSBpdC5cbiAgICAgIGZvciAoY29uc3QgY2xpZW50IG9mIGFsbENsaWVudHMpIHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChjbGllbnQudXJsKTtcblxuICAgICAgICBpZiAodXJsLnBhdGhuYW1lID09PSBwYXRoKSB7XG4gICAgICAgICAgY2xpZW50LmZvY3VzKCk7XG4gICAgICAgICAgYXBwQ2xpZW50ID0gY2xpZW50O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHdpbmRvdywgb3BlbiBhIG5ldyBvbmUuXG4gICAgICBpZiAoIWFwcENsaWVudCkge1xuICAgICAgICBhcHBDbGllbnQgPSBhd2FpdCBzZWxmLmNsaWVudHMub3BlbldpbmRvdyhwYXRoKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWVzc2FnZSB0aGUgY2xpZW50OlxuICAgICAgLy8gYG9yaWdpbmAgd2lsbCBhbHdheXMgYmUgYCdzZWxlY3RlZCdgIGluIHRoaXMgY2FzZS5cbiAgICAgIC8vIGh0dHBzOi8vZG9jcy5leHBvLmlvL3ZlcnNpb25zL2xhdGVzdC9zZGsvbm90aWZpY2F0aW9ucy8jbm90aWZpY2F0aW9uXG4gICAgICBhcHBDbGllbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBvcmlnaW46IFwic2VsZWN0ZWRcIixcbiAgICAgICAgZGF0YTogZXZlbnQubm90aWZpY2F0aW9uLmRhdGEsXG4gICAgICAgIHJlbW90ZTogIWV2ZW50Lm5vdGlmaWNhdGlvbi5faXNMb2NhbCxcbiAgICAgIH0pO1xuICAgIH0pKClcbiAgKTtcbn0pO1xuXG4vLyBUT0RPOiBDb25zaWRlciBjYWNoZTogaHR0cHM6Ly9naXRodWIuY29tL2V4cG8vZXhwby1jbGkvcHVsbC84NDQjaXNzdWVjb21tZW50LTUxNTYxOTg4M1xuLy8gSW1wb3J0IHRoZSBzY3JpcHQgZ2VuZXJhdGVkIGJ5IHdvcmtib3guXG5zZWxmLmltcG9ydFNjcmlwdHMoXCJzZXJ2aWNlLXdvcmtlci5qc1wiKTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxJQUFJLENBQUNDLGdCQUFMLENB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