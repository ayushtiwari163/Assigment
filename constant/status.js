
const success = {
    SUCCESS: {
      status: 'Success',
      statusCode: 200,
      message: 'Success',
    },
  };
  
  const failure = {
    UNAUTHORIZED: {
      status: 'unauthorized',
      statusCode: 403,
      message: 'Not authorized for this call',
    },
    NORECORDFOUND: {
      status: 'Not Found',
      statusCode: 400,
      message: 'No record found!',
    },
    DUBLICATE_PARAMETER: {
      status: 'Dublicate entry found',
      statusCode: 400,
      message: 'Username or password already exists',
    },
    INTERNAL_SERVER_ERROR: {
      status: 'Internal server error',
      statusCode: 500,
      message: 'Internal server error',
    },
  };
  
  module.exports = {
    success,
    failure,
  };
  