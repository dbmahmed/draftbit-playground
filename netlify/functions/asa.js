exports.handler = async function (event, context) {
  console.log(event.path)
  // Redirect to the Netlify function
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(

      {
        "applinks": {
          "details": [{
            "appIDs": [
              "V2J3KK598N.com.draftbit.playground"
            ],
            "components": [{
                "/": "/app/*",
                "comment": "Matches all routes"
              },
            ]
          }]
        },
        "activitycontinuation": {
          "apps": [
            "V2J3KK598N.com.draftbit.playground"
          ]
        },
        "webcredentials": {
          "apps": [
           "V2J3KK598N.com.draftbit.playground"
          ]
        }
      }
    )
  };
};
