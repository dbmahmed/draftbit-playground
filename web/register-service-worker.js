"use strict";

/* eslint-env browser */

/* global Toastify */

/**
 * This file was ejected from expo via `expo customize:web`. The additions are
 * marked between DRAFTBIT CUSTOM comments. The rest of the code is generated by
 * expo, and we should consider upstreaming fixes, re-ejecting, and re-adding
 * our custom code versus just fixing here.
 *
 * This file is a registration script, and it is executed by the browser at the
 * 'installing' stage of the service worker lifecycle.
 *
 * This script executes in the page's global scope, and so has access to modules
 * available at top level. For example, the Toastify library used below, which
 * is loaded in index.html.
 *
 * Highly reccomended that you use Chrome or Chromium to debug, as the tools are
 * much better.
 *
 * If you are unfamiliar with service workers, you should considering talking to
 * someone who is before making changes. Many of your assumptions are incorrect.
 * For example, service worker's require a very particular API to be invoked to
 * perform async functions at specific points in their lifecycle. It might just
 * work because you were lucky and won a race, that customers might lose and see
 * hard to diagnose bugs.
 *
 * Some helpful references:
 *  - ../webpack.config.js (contains settings)
 *  - ./expo-service-worker.js (controls behavior of worker)
 *  - Workbox (webpack plugin that does most of the hard work)
 *    - https://developers.google.com/web/tools/workbox
 *  - Service Workers: An introduction (specifically the lifecycle page)
 *    - https://developers.google.com/web/fundamentals/primers/service-workers
 */

/* BEGIN DRAFTBIT CUSTOM */

/**
 * Trigger a toast notification prompting the user to upgrade to the newest
 * version.
 */
function promptForRefresh(reg) {
  if (!navigator.serviceWorker.controller) {
    // Workaround for safari lifecycle weirdness that happens when there was
    // previously no service worker (i.e., no controller)
    return;
  } // Create a simple html node for Toastify to use, that we can target with our
  // own styles. See index.html for that css.


  let node = document.createElement("div");
  let but = document.createElement("button");
  let msg = document.createElement("div");
  but.innerText = "Update";
  but.className = "confirm";
  msg.className = "msg";
  msg.innerText = "A new version is available!";
  node.className = "container";
  node.appendChild(but);
  node.appendChild(msg);
  const toast = Toastify({
    duration: -1,
    // that is, forever
    node,
    className: "sw-update-toast",
    position: "right",
    gravity: "bottom"
  });

  but.onclick = () => {
    reg.waiting.postMessage("skipWaiting");
    toast.hideToast();
  };

  toast.showToast();
}
/**
 * Register a callback that closes over the current service worker registration
 * class and waits for the event corresponding with a new service worker being
 * ready to be activated (that is, in the lifecycle, it is installed but
 * "waiting" to be active).
 */


function listenForWaitingServiceWorker(reg, callback) {
  // Lazy register the callback on the installed event...
  function awaitStateChange() {
    reg.installing.addEventListener("statechange", function () {
      if (this.state === "installed") {
        callback(reg);
      }
    });
  } // ...but not if registration failed..


  if (!reg) {
    return;
  } // ... and not if we're already waiting (eagerly invoke callback)...


  if (reg.waiting) {
    return callback(reg);
  } // ... immediately if we're already installing...


  if (reg.installing) {
    awaitStateChange();
  } // ... or in all other cases, wait until we see a new update.


  reg.addEventListener("updatefound", awaitStateChange);
}
/**
 * debounce copied from underscore.js under MIT license.
 */


function debounce(func, wait, immediate) {
  /* eslint-disable */
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
  /* eslint-enable */
} // TODO(pckilgore): Most of these logs below are "standard" when ejecting (or
// not ejecting, for that matter). However, consider removing some of the noiser
// ones if this has been working without issues for a while.

/* eslint-disable no-console */

/* END DRAFTBIT CUSTOM */


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("SW_PUBLIC_URL/expo-service-worker.js", {
      scope: "SW_PUBLIC_SCOPE"
    })
    /* DRAFTBIT CUSTOM */
    .then(function (reg) {
      // Trigger prompt when new worker ready.
      listenForWaitingServiceWorker(reg, promptForRefresh); // Normally a browser will check for a new service worker (that is,
      // a new app) on navigation, or at minimum, every 24 hours.  It will
      // also check on certain events, but whether those occur is largely
      // outside our control.
      //
      // But Apps are SPAs, so no nav events.
      //
      // Instead, below, we trigger checks on touch/click events. Polling
      // doesn't seem to work for Chrome.  We debounce those checks to every
      // one minute.
      //
      // TODO(pckilgore): Consider "development" vs. "production" builds, and
      // only enable frequent checks like this in development builds.

      let debouncedUpdateSW = debounce(() => {
        console.log("Checking for new version...");

        try {
          reg.update();
        } catch (e) {
          console.groupCollapsed("Error fetching new service worker.");
          console.error(e);
          console.groupEnd();
        }
      }, 60000, true);
      document.addEventListener("click", () => {
        debouncedUpdateSW();
      }); // Ensure refresh is only called once.
      // This works around a bug in "force update on reload" in chrome.

      var refreshing;
      navigator.serviceWorker.addEventListener("controllerchange", function handleControllerChange() {
        if (refreshing) {
          return;
        }

        refreshing = true;
        window.location.reload();
      });
    })
    /* END DRAFTBIT CUSTOM */
    .catch(function (error) {
      console.info("Failed to register service-worker", error);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9tcHRGb3JSZWZyZXNoIiwicmVnIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsImNvbnRyb2xsZXIiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYnV0IiwibXNnIiwiaW5uZXJUZXh0IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJ0b2FzdCIsIlRvYXN0aWZ5IiwiZHVyYXRpb24iLCJwb3NpdGlvbiIsImdyYXZpdHkiLCJvbmNsaWNrIiwid2FpdGluZyIsInBvc3RNZXNzYWdlIiwiaGlkZVRvYXN0Iiwic2hvd1RvYXN0IiwibGlzdGVuRm9yV2FpdGluZ1NlcnZpY2VXb3JrZXIiLCJjYWxsYmFjayIsImF3YWl0U3RhdGVDaGFuZ2UiLCJpbnN0YWxsaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXRlIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJjb250ZXh0IiwiYXJncyIsImFyZ3VtZW50cyIsImxhdGVyIiwiYXBwbHkiLCJjYWxsTm93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIndpbmRvdyIsInJlZ2lzdGVyIiwic2NvcGUiLCJ0aGVuIiwiZGVib3VuY2VkVXBkYXRlU1ciLCJjb25zb2xlIiwibG9nIiwidXBkYXRlIiwiZSIsImdyb3VwQ29sbGFwc2VkIiwiZXJyb3IiLCJncm91cEVuZCIsInJlZnJlc2hpbmciLCJoYW5kbGVDb250cm9sbGVyQ2hhbmdlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjYXRjaCIsImluZm8iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvZml4dHVyZS1leHBvLXdlYi1idWlsZC1ib2lsZXJwbGF0ZS93ZWIvcmVnaXN0ZXItc2VydmljZS13b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWVudiBicm93c2VyICovXG4vKiBnbG9iYWwgVG9hc3RpZnkgKi9cblxuLyoqXG4gKiBUaGlzIGZpbGUgd2FzIGVqZWN0ZWQgZnJvbSBleHBvIHZpYSBgZXhwbyBjdXN0b21pemU6d2ViYC4gVGhlIGFkZGl0aW9ucyBhcmVcbiAqIG1hcmtlZCBiZXR3ZWVuIERSQUZUQklUIENVU1RPTSBjb21tZW50cy4gVGhlIHJlc3Qgb2YgdGhlIGNvZGUgaXMgZ2VuZXJhdGVkIGJ5XG4gKiBleHBvLCBhbmQgd2Ugc2hvdWxkIGNvbnNpZGVyIHVwc3RyZWFtaW5nIGZpeGVzLCByZS1lamVjdGluZywgYW5kIHJlLWFkZGluZ1xuICogb3VyIGN1c3RvbSBjb2RlIHZlcnN1cyBqdXN0IGZpeGluZyBoZXJlLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBhIHJlZ2lzdHJhdGlvbiBzY3JpcHQsIGFuZCBpdCBpcyBleGVjdXRlZCBieSB0aGUgYnJvd3NlciBhdCB0aGVcbiAqICdpbnN0YWxsaW5nJyBzdGFnZSBvZiB0aGUgc2VydmljZSB3b3JrZXIgbGlmZWN5Y2xlLlxuICpcbiAqIFRoaXMgc2NyaXB0IGV4ZWN1dGVzIGluIHRoZSBwYWdlJ3MgZ2xvYmFsIHNjb3BlLCBhbmQgc28gaGFzIGFjY2VzcyB0byBtb2R1bGVzXG4gKiBhdmFpbGFibGUgYXQgdG9wIGxldmVsLiBGb3IgZXhhbXBsZSwgdGhlIFRvYXN0aWZ5IGxpYnJhcnkgdXNlZCBiZWxvdywgd2hpY2hcbiAqIGlzIGxvYWRlZCBpbiBpbmRleC5odG1sLlxuICpcbiAqIEhpZ2hseSByZWNjb21lbmRlZCB0aGF0IHlvdSB1c2UgQ2hyb21lIG9yIENocm9taXVtIHRvIGRlYnVnLCBhcyB0aGUgdG9vbHMgYXJlXG4gKiBtdWNoIGJldHRlci5cbiAqXG4gKiBJZiB5b3UgYXJlIHVuZmFtaWxpYXIgd2l0aCBzZXJ2aWNlIHdvcmtlcnMsIHlvdSBzaG91bGQgY29uc2lkZXJpbmcgdGFsa2luZyB0b1xuICogc29tZW9uZSB3aG8gaXMgYmVmb3JlIG1ha2luZyBjaGFuZ2VzLiBNYW55IG9mIHlvdXIgYXNzdW1wdGlvbnMgYXJlIGluY29ycmVjdC5cbiAqIEZvciBleGFtcGxlLCBzZXJ2aWNlIHdvcmtlcidzIHJlcXVpcmUgYSB2ZXJ5IHBhcnRpY3VsYXIgQVBJIHRvIGJlIGludm9rZWQgdG9cbiAqIHBlcmZvcm0gYXN5bmMgZnVuY3Rpb25zIGF0IHNwZWNpZmljIHBvaW50cyBpbiB0aGVpciBsaWZlY3ljbGUuIEl0IG1pZ2h0IGp1c3RcbiAqIHdvcmsgYmVjYXVzZSB5b3Ugd2VyZSBsdWNreSBhbmQgd29uIGEgcmFjZSwgdGhhdCBjdXN0b21lcnMgbWlnaHQgbG9zZSBhbmQgc2VlXG4gKiBoYXJkIHRvIGRpYWdub3NlIGJ1Z3MuXG4gKlxuICogU29tZSBoZWxwZnVsIHJlZmVyZW5jZXM6XG4gKiAgLSAuLi93ZWJwYWNrLmNvbmZpZy5qcyAoY29udGFpbnMgc2V0dGluZ3MpXG4gKiAgLSAuL2V4cG8tc2VydmljZS13b3JrZXIuanMgKGNvbnRyb2xzIGJlaGF2aW9yIG9mIHdvcmtlcilcbiAqICAtIFdvcmtib3ggKHdlYnBhY2sgcGx1Z2luIHRoYXQgZG9lcyBtb3N0IG9mIHRoZSBoYXJkIHdvcmspXG4gKiAgICAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi90b29scy93b3JrYm94XG4gKiAgLSBTZXJ2aWNlIFdvcmtlcnM6IEFuIGludHJvZHVjdGlvbiAoc3BlY2lmaWNhbGx5IHRoZSBsaWZlY3ljbGUgcGFnZSlcbiAqICAgIC0gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9wcmltZXJzL3NlcnZpY2Utd29ya2Vyc1xuICovXG5cbi8qIEJFR0lOIERSQUZUQklUIENVU1RPTSAqL1xuXG4vKipcbiAqIFRyaWdnZXIgYSB0b2FzdCBub3RpZmljYXRpb24gcHJvbXB0aW5nIHRoZSB1c2VyIHRvIHVwZ3JhZGUgdG8gdGhlIG5ld2VzdFxuICogdmVyc2lvbi5cbiAqL1xuZnVuY3Rpb24gcHJvbXB0Rm9yUmVmcmVzaChyZWcpIHtcbiAgaWYgKCFuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5jb250cm9sbGVyKSB7XG4gICAgLy8gV29ya2Fyb3VuZCBmb3Igc2FmYXJpIGxpZmVjeWNsZSB3ZWlyZG5lc3MgdGhhdCBoYXBwZW5zIHdoZW4gdGhlcmUgd2FzXG4gICAgLy8gcHJldmlvdXNseSBubyBzZXJ2aWNlIHdvcmtlciAoaS5lLiwgbm8gY29udHJvbGxlcilcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzaW1wbGUgaHRtbCBub2RlIGZvciBUb2FzdGlmeSB0byB1c2UsIHRoYXQgd2UgY2FuIHRhcmdldCB3aXRoIG91clxuICAvLyBvd24gc3R5bGVzLiBTZWUgaW5kZXguaHRtbCBmb3IgdGhhdCBjc3MuXG4gIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IGJ1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGxldCBtc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXQuaW5uZXJUZXh0ID0gXCJVcGRhdGVcIjtcbiAgYnV0LmNsYXNzTmFtZSA9IFwiY29uZmlybVwiO1xuXG4gIG1zZy5jbGFzc05hbWUgPSBcIm1zZ1wiO1xuICBtc2cuaW5uZXJUZXh0ID0gXCJBIG5ldyB2ZXJzaW9uIGlzIGF2YWlsYWJsZSFcIjtcbiAgbm9kZS5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuICBub2RlLmFwcGVuZENoaWxkKGJ1dCk7XG4gIG5vZGUuYXBwZW5kQ2hpbGQobXNnKTtcblxuICBjb25zdCB0b2FzdCA9IFRvYXN0aWZ5KHtcbiAgICBkdXJhdGlvbjogLTEsXG4gICAgLy8gdGhhdCBpcywgZm9yZXZlclxuICAgIG5vZGUsXG4gICAgY2xhc3NOYW1lOiBcInN3LXVwZGF0ZS10b2FzdFwiLFxuICAgIHBvc2l0aW9uOiBcInJpZ2h0XCIsXG4gICAgZ3Jhdml0eTogXCJib3R0b21cIixcbiAgfSk7XG5cbiAgYnV0Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcmVnLndhaXRpbmcucG9zdE1lc3NhZ2UoXCJza2lwV2FpdGluZ1wiKTtcbiAgICB0b2FzdC5oaWRlVG9hc3QoKTtcbiAgfTtcblxuICB0b2FzdC5zaG93VG9hc3QoKTtcbn1cbi8qKlxuICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IGNsb3NlcyBvdmVyIHRoZSBjdXJyZW50IHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvblxuICogY2xhc3MgYW5kIHdhaXRzIGZvciB0aGUgZXZlbnQgY29ycmVzcG9uZGluZyB3aXRoIGEgbmV3IHNlcnZpY2Ugd29ya2VyIGJlaW5nXG4gKiByZWFkeSB0byBiZSBhY3RpdmF0ZWQgKHRoYXQgaXMsIGluIHRoZSBsaWZlY3ljbGUsIGl0IGlzIGluc3RhbGxlZCBidXRcbiAqIFwid2FpdGluZ1wiIHRvIGJlIGFjdGl2ZSkuXG4gKi9cbmZ1bmN0aW9uIGxpc3RlbkZvcldhaXRpbmdTZXJ2aWNlV29ya2VyKHJlZywgY2FsbGJhY2spIHtcbiAgLy8gTGF6eSByZWdpc3RlciB0aGUgY2FsbGJhY2sgb24gdGhlIGluc3RhbGxlZCBldmVudC4uLlxuICBmdW5jdGlvbiBhd2FpdFN0YXRlQ2hhbmdlKCkge1xuICAgIHJlZy5pbnN0YWxsaW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gXCJpbnN0YWxsZWRcIikge1xuICAgICAgICBjYWxsYmFjayhyZWcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gLi4uYnV0IG5vdCBpZiByZWdpc3RyYXRpb24gZmFpbGVkLi5cbiAgaWYgKCFyZWcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyAuLi4gYW5kIG5vdCBpZiB3ZSdyZSBhbHJlYWR5IHdhaXRpbmcgKGVhZ2VybHkgaW52b2tlIGNhbGxiYWNrKS4uLlxuICBpZiAocmVnLndhaXRpbmcpIHtcbiAgICByZXR1cm4gY2FsbGJhY2socmVnKTtcbiAgfVxuXG4gIC8vIC4uLiBpbW1lZGlhdGVseSBpZiB3ZSdyZSBhbHJlYWR5IGluc3RhbGxpbmcuLi5cbiAgaWYgKHJlZy5pbnN0YWxsaW5nKSB7XG4gICAgYXdhaXRTdGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgLy8gLi4uIG9yIGluIGFsbCBvdGhlciBjYXNlcywgd2FpdCB1bnRpbCB3ZSBzZWUgYSBuZXcgdXBkYXRlLlxuICByZWcuYWRkRXZlbnRMaXN0ZW5lcihcInVwZGF0ZWZvdW5kXCIsIGF3YWl0U3RhdGVDaGFuZ2UpO1xufVxuXG4vKipcbiAqIGRlYm91bmNlIGNvcGllZCBmcm9tIHVuZGVyc2NvcmUuanMgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICB2YXIgdGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuXG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgfTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xufVxuXG4vLyBUT0RPKHBja2lsZ29yZSk6IE1vc3Qgb2YgdGhlc2UgbG9ncyBiZWxvdyBhcmUgXCJzdGFuZGFyZFwiIHdoZW4gZWplY3RpbmcgKG9yXG4vLyBub3QgZWplY3RpbmcsIGZvciB0aGF0IG1hdHRlcikuIEhvd2V2ZXIsIGNvbnNpZGVyIHJlbW92aW5nIHNvbWUgb2YgdGhlIG5vaXNlclxuLy8gb25lcyBpZiB0aGlzIGhhcyBiZWVuIHdvcmtpbmcgd2l0aG91dCBpc3N1ZXMgZm9yIGEgd2hpbGUuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuLyogRU5EIERSQUZUQklUIENVU1RPTSAqL1xuXG5pZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcbiAgICAgIC5yZWdpc3RlcihcIlNXX1BVQkxJQ19VUkwvZXhwby1zZXJ2aWNlLXdvcmtlci5qc1wiLCB7XG4gICAgICAgIHNjb3BlOiBcIlNXX1BVQkxJQ19TQ09QRVwiLFxuICAgICAgfSlcbiAgICAgIC8qIERSQUZUQklUIENVU1RPTSAqL1xuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlZykge1xuICAgICAgICAvLyBUcmlnZ2VyIHByb21wdCB3aGVuIG5ldyB3b3JrZXIgcmVhZHkuXG4gICAgICAgIGxpc3RlbkZvcldhaXRpbmdTZXJ2aWNlV29ya2VyKHJlZywgcHJvbXB0Rm9yUmVmcmVzaCk7XG5cbiAgICAgICAgLy8gTm9ybWFsbHkgYSBicm93c2VyIHdpbGwgY2hlY2sgZm9yIGEgbmV3IHNlcnZpY2Ugd29ya2VyICh0aGF0IGlzLFxuICAgICAgICAvLyBhIG5ldyBhcHApIG9uIG5hdmlnYXRpb24sIG9yIGF0IG1pbmltdW0sIGV2ZXJ5IDI0IGhvdXJzLiAgSXQgd2lsbFxuICAgICAgICAvLyBhbHNvIGNoZWNrIG9uIGNlcnRhaW4gZXZlbnRzLCBidXQgd2hldGhlciB0aG9zZSBvY2N1ciBpcyBsYXJnZWx5XG4gICAgICAgIC8vIG91dHNpZGUgb3VyIGNvbnRyb2wuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEJ1dCBBcHBzIGFyZSBTUEFzLCBzbyBubyBuYXYgZXZlbnRzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBJbnN0ZWFkLCBiZWxvdywgd2UgdHJpZ2dlciBjaGVja3Mgb24gdG91Y2gvY2xpY2sgZXZlbnRzLiBQb2xsaW5nXG4gICAgICAgIC8vIGRvZXNuJ3Qgc2VlbSB0byB3b3JrIGZvciBDaHJvbWUuICBXZSBkZWJvdW5jZSB0aG9zZSBjaGVja3MgdG8gZXZlcnlcbiAgICAgICAgLy8gb25lIG1pbnV0ZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVE9ETyhwY2tpbGdvcmUpOiBDb25zaWRlciBcImRldmVsb3BtZW50XCIgdnMuIFwicHJvZHVjdGlvblwiIGJ1aWxkcywgYW5kXG4gICAgICAgIC8vIG9ubHkgZW5hYmxlIGZyZXF1ZW50IGNoZWNrcyBsaWtlIHRoaXMgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLlxuXG4gICAgICAgIGxldCBkZWJvdW5jZWRVcGRhdGVTVyA9IGRlYm91bmNlKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIG5ldyB2ZXJzaW9uLi4uXCIpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZWcudXBkYXRlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoXCJFcnJvciBmZXRjaGluZyBuZXcgc2VydmljZSB3b3JrZXIuXCIpO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICA2MDAwMCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgZGVib3VuY2VkVXBkYXRlU1coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRW5zdXJlIHJlZnJlc2ggaXMgb25seSBjYWxsZWQgb25jZS5cbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYSBidWcgaW4gXCJmb3JjZSB1cGRhdGUgb24gcmVsb2FkXCIgaW4gY2hyb21lLlxuICAgICAgICB2YXIgcmVmcmVzaGluZztcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNvbnRyb2xsZXJjaGFuZ2VcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVDb250cm9sbGVyQ2hhbmdlKCkge1xuICAgICAgICAgICAgaWYgKHJlZnJlc2hpbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC8qIEVORCBEUkFGVEJJVCBDVVNUT00gKi9cbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiRmFpbGVkIHRvIHJlZ2lzdGVyIHNlcnZpY2Utd29ya2VyXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLGdCQUFULENBQTBCQyxHQUExQixFQUErQjtFQUM3QixJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QkMsVUFBN0IsRUFBeUM7SUFDdkM7SUFDQTtJQUNBO0VBQ0QsQ0FMNEIsQ0FPN0I7RUFDQTs7O0VBQ0EsSUFBSUMsSUFBSSxHQUFHQyxR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