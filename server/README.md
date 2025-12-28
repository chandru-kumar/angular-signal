CRUD API server (in-memory)

This small Express server provides simple in-memory CRUD endpoints intended for demo and local development (no database). It's used by the project's Signal examples to demonstrate calling backend APIs.

Location
- server/server.js
- Start with `npm run server` from the repository root.

Default port
- 7001 (overridable via environment variable `PORT`).

How to run

```bash
# from repository root
npm install        # if dependencies haven't been installed yet
npm run server
```

The server logs a message like:

```
CRUD server listening on http://localhost:7001
```

Health check

```bash
curl http://localhost:7001/health
# -> { "ok": true, "port": 7001 }
```

Endpoints

- GET /health
  - Returns: { ok: true, port }

- GET /items
  - Returns the full array of items.
  - Example response:
    ```json
    [ { "id": 1, "name": "Apples", "qty": 3 } ]
    ```

- GET /items/:id
  - Returns single item or 404 if not found.

- POST /items
  - Create a new item.
  - Body (JSON): { "name": string, "qty": number }
  - Response: 201 Created with the created item.
  - Example:
    ```bash
    curl -X POST http://localhost:7001/items \
      -H 'Content-Type: application/json' \
      -d '{"name":"Oranges","qty":10}'
    ```

- PUT /items/:id
  - Replace the item. Body must include `name`.
  - Body (JSON): { "name": string, "qty": number }
  - Returns updated item or 404.

- PATCH /items/:id
  - Partial update. Body may contain `name` and/or `qty`.
  - Returns the updated item.

- DELETE /items/:id
  - Deletes an item and returns the deleted item or 404.

- POST /seed
  - Resets and seeds the store with sample items (Apples, Bananas).
  - Example: `curl -X POST http://localhost:7001/seed`

Notes

- This server stores data in a local array (`items`) and is not persistent. It's meant for development and demo usage only.
- CORS is enabled for local development convenience.
- Validation is intentionally light (requires `name` for creates/puts).

Example sequence (quick demo)

```bash
# seed sample data
curl -X POST http://localhost:7001/seed

# list
curl http://localhost:7001/items

# create
curl -X POST http://localhost:7001/items -H 'Content-Type: application/json' -d '{"name":"Pears","qty":4}'

# update id=1
curl -X PATCH http://localhost:7001/items/1 -H 'Content-Type: application/json' -d '{"qty":7}'

# delete id=2
curl -X DELETE http://localhost:7001/items/2
```

Integrating with Angular examples

- Use the endpoint `http://localhost:7001/items` from your Angular services when running the app locally.
- If you run Angular in a different origin/port, CORS is already enabled on the server.

If you want, I can:
- Add a tiny Angular `ApiService` that calls these endpoints and demonstrate using Signals to keep client state in sync with the server (CRUD examples), or
- Add a Swagger/OpenAPI description and a small route to serve it.

License: MIT (for demo scaffolding)

