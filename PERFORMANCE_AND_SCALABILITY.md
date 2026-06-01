# PERFORMANCE AND SCALABILITY

## Frontend bottlenecks
- Full list rerender on each mutation (`setTasks([...])`, `map/filter`).
- No memoization for derived task views.
- No pagination or virtualization for large task datasets.

## Backend bottlenecks
- Single process server.
- Controller-level validation repeated manually.
- Sorting/filtering done on DB queries but without task-specific indexes.

## Database bottlenecks
- Task collection can grow without pagination and index tuning.
- User-scoped query patterns need compound indexes for sustained throughput.

## Network bottlenecks
- No response compression config shown.
- No CDN fronting API/static docs.

## Scaling by traffic tier
- **~10 users**: current architecture is comfortably sufficient.
- **~100 users**: still fine; start observing DB query latency.
- **~10k users**: need indexes, pagination, horizontal backend replicas, structured observability.
- **~1M users**: requires major redesign: sharding/partition strategy, caching layers, async processing, auth/session hardening, SLO-driven operations.

## Techniques to introduce
- Pagination + server-side query limits
- Caching hot reads (Redis)
- Queue systems for async heavy tasks
- Lazy loading/code splitting on frontend
- CDN for static assets
- Horizontal autoscaling + load balancers
