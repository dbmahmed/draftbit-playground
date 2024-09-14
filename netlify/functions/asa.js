exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    statusDescription: "OK",
    headers: { "content-type": { value: "application/json" } },
    body: {
      encoding: "text",
      data: "{\"applinks\":{\"details\":[{\"appIDs\":[\"V2J3KK598N.com.draftbit.playground\"],\"components\":[{\"/\":\"/test/*\",\"comment\":\"Matches any URL with a path that starts with /test/.\"}]}]},\"webcredentials\":{\"apps\":[\"V2J3KK598N.com.draftbit.playground\"]}}",
    },
  };
};
