exports.handler = async (event, context) => {
  // Simple authentication for CMS
  const { email, password } = JSON.parse(event.body);
  
  // For now, allow any login (you can add proper validation later)
  if (email && password) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: 'simple-auth-token',
        user: { email }
      })
    };
  }
  
  return {
    statusCode: 401,
    body: JSON.stringify({ error: 'Invalid credentials' })
  };
}; 