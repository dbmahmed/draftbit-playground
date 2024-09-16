exports.handler = async function (event, context) {
console.log(event.path)
    // Redirect to the Netlify function
    return {
    statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json; charset=utf-8',
		},
    body: `{\"activitycontinuation\":{\"apps\" : [\"V2J3KK598N.com.draftbit.playground\"]},\"applinks\":{\"details\":[{\"appIDs\":[\"V2J3KK598N.com.draftbit.playground\"],\"components\":[{\"/\":\"/test/*\",\"comment\":\"Matches any URL with a path that starts with /test/.\"}]}]},\"webcredentials\":{\"apps\":[\"V2J3KK598N.com.draftbit.playground\"]}}`,
  };
  
};
