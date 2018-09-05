# GraphQL Server

[![Greenkeeper badge](https://badges.greenkeeper.io/yakovlevyuri/react-graphql-starter.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/yakovlevyuri/react-graphql-starter.svg?branch=master)](https://travis-ci.com/yakovlevyuri/react-graphql-starter)

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

```
mutation signInUser {
  signInUser(email: "hi@mynameisyuri.com", password: "testpass") {
    token
    user {
      id
    }
  }
}
```

```
mutation createUser {
  createUser(
    firstName: "Yuri"
    lastName: "Yakovlev"
    email: "hi@mynameisyuri.com"
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

```
mutation updateUser {
  updateUser(
    id: "5b8efc08ee49eb0927b40e80"
    update: {
      firstName: "Yuri"
      lastName: "Yakovlev"
      email: "hi@mynameisyuri.com"
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

```
mutation deleteUser {
  deleteUser(id: "5b8ee99e4759280767ee0725") {
    id
    firstName
  }
}
```
