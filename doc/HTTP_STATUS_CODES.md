## [Feathers errors](https://docs.feathersjs.com/middleware/error-handling.html#feathers-error-types)

Feathers-errors currently provides the following error types,
all of which are instances of FeathersError:

- BadRequest: 400
- NotAuthenticated: 401
- PaymentError: 402
- Forbidden: 403
- NotFound: 404
- MethodNotAllowed: 405
- NotAcceptable: 406
- Timeout: 408
- Conflict: 409
- Unprocessable: 422
- GeneralError: 500
- NotImplemented: 501
- Unavailable: 503

They contain the following fields:

- type - FeathersError
- name - The error name (ie. "BadRequest", "ValidationError", etc.)
- message - The error message string
- code - The HTTP status code
- className - A CSS class name that can be handy for styling errors based on the error type.
(ie. "bad-request" , etc.)
- data - An object containing anything you passed to a Feathers error except for the errors object.
- errors - An object containing whatever was passed to a Feathers error inside errors.
This is typically validation errors or if you want to group multiple errors together.