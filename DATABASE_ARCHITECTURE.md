# DATABASE ARCHITECTURE

## Database type and rationale
- **MongoDB (document DB)** with **Mongoose ODM**.
- Fit: simple object persistence, fast iteration, JSON-like schema alignment with JS.

## Schemas
### User
- `email` (required, unique, lowercase, trimmed)
- `password` (required, hashed)
- timestamps enabled
- explicit email index via `userSchema.index({ email: 1 })`

### Task
- `title` required
- `description` optional
- `completed` boolean default false
- `priority` enum: low/medium/high
- `user` ObjectId reference to User (required)
- timestamps enabled

## Relationships
- One user -> many tasks.
- Relationship implemented by storing user id in each task doc.

## Query patterns in code
- Fetch all tasks for user with optional filters/sort (`getTasks`).
- Update/delete scoped by task id + user id.
- Authentication lookups by email.

## Data lifecycle
1. Register creates User doc with hashed password
2. Login reads User doc and verifies hash
3. Task create inserts Task doc with foreign key (`user`)
4. Reads/updates/deletes always constrained by `user`

## Transactions and migrations
- No explicit transactions used.
- No migration framework currently present.
- Schema evolution is handled by Mongoose defaults/optional fields.

## Performance implications
- Current indexing is minimal (User email index explicit; Task indexes implicit only).
- At scale, add compound indexes like `{ user: 1, createdAt: -1 }` and `{ user: 1, completed: 1 }`.
- Connection pooling handled by Mongoose defaults; tune pool size under heavy concurrency.

## Alternatives and tradeoffs
- PostgreSQL would provide stronger relational guarantees and SQL analytics.
- MongoDB keeps development velocity high but requires disciplined indexing/validation as load grows.
