import cookie from 'cookie';
import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, Mutation } from 'react-apollo';
import redirect from '../lib/redirect';

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;

const SignInBox = ({ client }) => {
  let email;
  let password;

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={async data => {
        document.cookie = cookie.serialize('token', data.signInUser.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        try {
          await client.cache.reset();
          redirect({}, '/dashboard');
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error(err);
        }
      }}
      onError={error => {
        // tslint:disable-next-line:no-console
        console.error(error);
      }}
    >
      {(signInUser, { error }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();

            signInUser({
              variables: {
                email: email.value,
                password: password.value,
              },
            });

            email.value = password.value = '';
          }}
        >
          {error && <p>No user found with that information.</p>}
          <input
            name="email"
            placeholder="Email"
            ref={node => {
              email = node;
            }}
          />
          <br />
          <input
            name="password"
            placeholder="Password"
            ref={node => {
              password = node;
            }}
            type="password"
          />
          <br />
          <button>Sign in</button>
        </form>
      )}
    </Mutation>
  );
};

export default withApollo(SignInBox);
