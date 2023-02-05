# node-jwt-practice

This an example of a JWT token application in Node, Express and Typescript.

Use the [pnpm](https://pnpm.io/) package manager to install the dependencies

```
pnpm i
```

Create a `.env` file

```
cp .env.example .env
```

Edit the `.env` and enter example data.

Start the server in development mode.

```
pnpm run start:dev
```

Build the server:

```
pnpm run build
```

Use the `POST` route `/login` to get your `JWT` token:

```
curl -X POST http://localhost:3000/login \
    -H 'Content-Type: application/json' \
    -d '{"email": "your_email@example.com","password": "a password"}'
```

Access the protected route:

```
curl -X GET \
  http://localhost:3000/hello \
  -H 'Authorization: Bearer your_bearer_token'
```

# Copying

Read the `LICENSE` file for more information.
