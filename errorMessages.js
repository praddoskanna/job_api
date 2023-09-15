const errorMessages = {
    USER_NOT_FOUND: {
        message: 'User does not exist',
        code: 404, // HTTP 404 Not Found
    },
    INVALID_OTP: {
        message: 'Invalid OTP',
        code: 403, // HTTP 403 Forbidden
    },
    OTP_VERIFICATION_FAILED: {
        message: 'OTP verification failed',
        code: 500, // HTTP 500 Internal Server Error
    },
    RESOURCE_NOT_FOUND: {
        message: 'Requested resource not found',
        code: 404, // HTTP 404 Not Found
    },
    VALIDATION_ERROR: {
        message: 'Validation error',
        code: 400, // HTTP 400 Bad Request
    },
    SERVER_ERROR: {
        message: 'Internal server error',
        code: 500, // HTTP 500 Internal Server Error
    },
    USER_ALREADY_EXISTS: {
        message: 'User already exists',
        code: 409, // HTTP 409 Conflict
    },
    SIGNUP_FAILED: {
        message: 'Signup failed',
        code: 500, // HTTP 500 Internal Server Error
    },
    VERIFY_OTP_FAILED: {
        message: 'OTP verification failed',
        code: 500, // HTTP 500 Internal Server Error
    },
    SIGNIN_FAILED: {
        message: 'Signin failed',
        code: 401, // HTTP 401 Unauthorized
    },
    USER_CREATION_ERROR: {
        message: 'Unable to Create User',
        code: 409, // HTTP 400 Bad Request
    },
    FILE_UPLOAD_ERROR: {
        message: 'Unable to Upload File',
        code: 409, // HTTP 400 Bad Request
    },
    FAILED_TO_UPDATE: {
        message: 'Failed to Update Data to Server',
        code: 409, // HTTP 400 Bad Request
    },
};

module.exports = errorMessages;


