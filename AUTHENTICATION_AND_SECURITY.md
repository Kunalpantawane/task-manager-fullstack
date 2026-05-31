# AUTHENTICATION AND SECURITY

## Signup flow
1. `POST /api/register`
2. Validate email/password presence, email regex, min password length
3. Check existing email
4. Hash password with bcrypt (12 rounds)
5. Store user and return non-sensitive user payload

## Login flow
1. `POST /api/login`
2. Find user by normalized email
3. Compare bcrypt hash
4. Issue JWT (`expiresIn: 7d`) signed with `JWT_SECRET`
5. Frontend stores token in localStorage

## Protected route flow
1. Frontend sends `Authorization: ******
2. `authMiddleware` verifies token
3. decoded payload assigned to `req.user`
4. Task controllers use `req.user.id` as ownership filter

## Security controls present
- Password hashing (`bcryptjs`)
- JWT verification middleware
- Helmet security headers
- CORS origin control (prod uses `FRONTEND_URL`)
- Rate limiting (`/api/auth` and `/api`)
- Required env var checks at startup

## Gaps and attack vectors
- LocalStorage token storage is XSS-sensitive; HttpOnly secure cookies are stronger.
- No CSRF strategy is needed currently with bearer headers, but would be needed if cookie auth is introduced.
- Validation is controller-local and not centrally normalized.
- No account lockout / MFA / anomaly detection.
- Error messages are fairly generic but still include `err.message` in some 500 responses.

## Enterprise-grade improvements
- Move to short-lived access token + refresh token rotation.
- Use HttpOnly cookies + SameSite controls.
- Add centralized validation middleware (schema-first).
- Add audit logs, auth events, and SIEM integration.
- Add secrets rotation and managed secret stores (Vault/SSM/Secrets Manager).
