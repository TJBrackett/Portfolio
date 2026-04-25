# brackett.dev — Personal Portfolio Website — API Specification

## `POST /api/v1/chat`
Send a user message to TJBot. The backend appends the message to the session history, calls the Claude API with the system prompt and full history, logs the exchange to SQLite, and returns TJBot's response.

**Auth required:** No

**Request body:**
```json
{
  "session_id": "string \u2014 UUID for the current conversation session",
  "message": "string \u2014 the user's message text"
}
```

**Response:**
```json
{
  "session_id": "string",
  "response": "string \u2014 TJBot's reply",
  "timestamp": "string \u2014 ISO8601 timestamp"
}
```

## `GET /api/v1/chat/status`
Check the availability of the Claude API. Used by the frontend to determine whether to enable or disable the TJBot input.

**Auth required:** No

**Response:**
```json
{
  "available": "boolean",
  "message": "string \u2014 human-readable status message"
}
```

## `POST /api/v1/contact`
Submit a contact form entry. Stores the submission in SQLite and dispatches a formatted message to TJ's Discord server via the Discord bot.

**Auth required:** No

**Request body:**
```json
{
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "message_body": "string",
  "response_pref_call": "boolean",
  "response_pref_text": "boolean",
  "response_pref_email": "boolean"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string \u2014 confirmation or error message"
}
```

## `POST /api/v1/visitor/track`
Log a page visit. Called by the frontend on page load to record IP, path, and timestamp. Also used by the duration beacon on page unload to update the duration for an existing visit record.

**Auth required:** No

**Request body:**
```json
{
  "page_path": "string \u2014 the URL path being visited",
  "visit_id": "string or null \u2014 if provided, updates duration for existing visit; if null, creates new record",
  "duration_seconds": "integer or null \u2014 only provided on unload beacon"
}
```

**Response:**
```json
{
  "visit_id": "integer \u2014 the database ID of the visit record, returned on creation for use in the duration beacon"
}
```

## `POST /api/v1/admin/login`
Admin login step 1: validate username and password. Returns a temporary token for TOTP verification step. Enforces account lockout after 5 failed attempts.

**Auth required:** No

**Request body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": "boolean",
  "pre_auth_token": "string or null \u2014 short-lived token to be used in the TOTP step",
  "message": "string \u2014 error message if failed, including lockout status"
}
```

## `POST /api/v1/admin/verify-totp`
Admin login step 2: validate the TOTP code using the pre-auth token from step 1. Issues a full session JWT on success.

**Auth required:** No

**Request body:**
```json
{
  "pre_auth_token": "string",
  "totp_code": "string \u2014 6-digit TOTP code"
}
```

**Response:**
```json
{
  "success": "boolean",
  "access_token": "string or null \u2014 JWT session token",
  "expires_at": "string \u2014 ISO8601 expiry timestamp",
  "message": "string"
}
```

## `GET /api/v1/admin/conversations`
Retrieve paginated list of TJBot conversation sessions with their messages for the admin dashboard.

**Auth required:** Yes

**Response:**
```json
{
  "sessions": "array of ChatSession objects with nested ChatMessage arrays",
  "total": "integer",
  "page": "integer",
  "page_size": "integer"
}
```

## `DELETE /api/v1/admin/conversations/{session_id}`
Delete a TJBot conversation session and all its messages.

**Auth required:** Yes

**Response:**
```json
{
  "success": "boolean"
}
```

## `GET /api/v1/admin/contact-submissions`
Retrieve paginated list of Discord contact form submissions for the admin dashboard.

**Auth required:** Yes

**Response:**
```json
{
  "submissions": "array of ContactSubmission objects",
  "total": "integer",
  "page": "integer",
  "page_size": "integer"
}
```

## `DELETE /api/v1/admin/contact-submissions/{id}`
Delete a specific contact form submission.

**Auth required:** Yes

**Response:**
```json
{
  "success": "boolean"
}
```

## `GET /api/v1/admin/visitor-logs`
Retrieve paginated list of visitor log entries for the admin dashboard.

**Auth required:** Yes

**Response:**
```json
{
  "logs": "array of VisitorLog objects",
  "total": "integer",
  "page": "integer",
  "page_size": "integer"
}
```

## `DELETE /api/v1/admin/visitor-logs/{id}`
Delete a specific visitor log entry.

**Auth required:** Yes

**Response:**
```json
{
  "success": "boolean"
}
```

## `GET /api/v1/admin/me`
Validate the current admin session token and return basic session info. Used by the frontend to verify the session is still valid.

**Auth required:** Yes

**Response:**
```json
{
  "valid": "boolean",
  "expires_at": "string"
}
```
