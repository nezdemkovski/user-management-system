# GraphQL Server

## Before you start
First rename `.env-sample` file to `.env`. It contains all default values for proper work on your local machine.
```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_URL=
MONGO_DB_NAME=

# JWT Secret passphrase
APP_SECRET= 
```

## How to run it

```bash
$ npm install
$ npm run start

# or

$ yarn
$ yarn start
```

## How to deploy on AWS Lambda

Easy Peasy. Serverless framework takes care of the whole deployment process. 
Just make sure you provided all necessary credentials to the Serverless first.
After that you are ready to deploy.

```bash
$ yarn deploy
```
It should take a few minutes for your application to be deployed.

## How to run tests

```bash
$ npm run test

# or

$ yarn test
```

## GraphQL Server API

### Queries

Get user info by `ID`:
```
query user {
  user(id: "5b8ee9f7f996660789b28360") {
    id
    firstName
    lastName
    email
    role
    profilePictureUrl
  }
}
```

Get the list of all available users:
```
query users {
  users {
    id
    firstName
    lastName
    email
    role
    profilePictureUrl
  }
}
```

Get current user by providing an `Authorization` token in the request header (Example: `Bearer eyJhbGciOiJIUzI1NkIsInR5cCI6IkaXVCJ9.eyJ1c2VySWqiOiI1Y...`):
```
query currentUser {
  currentUser {
    id
    firstName
    lastName
    email
    role
    profilePictureUrl
  }
}
```

### Mutations

Sign In using email and password:
```
mutation signInUser {
  signInUser(email: "test@test.comm", password: "testpass") {
    token
    user {
      id
    }
  }
}
```

Create a new user:
```
mutation createUser {
  createUser(
    firstName: "Yuri"
    lastName: "Yakovlev"
    email: "test@test.com"
    password: "testpass"
    role: ADMIN
    profilePictureUrl: "https://avatars1.githubusercontent.com/u/4764539"
  ) {
    token
    user {
      id
      firstName
    }
  }
}
```

Update User info:
```
mutation updateUser {
  updateUser(
    id: "5b8efc08ee49eb0927b40e80"
    update: {
      firstName: "Yuri"
      lastName: "Yakovlev"
      email: "test@test.com"
      password: "testpass"
      role: EDITOR
      profilePictureUrl: "https://avatars1.githubusercontent.com/u/4764539"
    }
  ) {
    token
    user {
      id
      firstName
    }
  }
}
```

Delete User by `ID`:
```
mutation deleteUser {
  deleteUser(id: "5b8ee99e4759280767ee0725") {
    id
    firstName
  }
}
```

## License

MIT 2018 Yuri Yakovlev
