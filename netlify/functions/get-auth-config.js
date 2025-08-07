exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check if environment variables are set
  const clientId = process.env.AUTH0_CLIENT_ID;
  const domain = process.env.AUTH0_DOMAIN;

  if (!clientId || !domain) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ 
        error: 'Auth0 configuration not found',
        message: 'Please set AUTH0_CLIENT_ID and AUTH0_DOMAIN environment variables'
      })
    };
  }

  // Return the configuration
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      clientId: clientId,
      domain: domain
    })
  };
}; 