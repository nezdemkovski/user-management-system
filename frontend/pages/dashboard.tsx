import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

import DashBoard from '../components/DashBoard';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  active: boolean;
}

export const USER_FRAGMENT = gql`
  fragment UserData on User {
    id
    firstName
    lastName
    email
    role
    profilePictureUrl
    active
  }
`;

export const GET_USER_LIST = gql`
  query users {
    users {
      ...UserData
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ userData }) => (
  <Query query={GET_USER_LIST}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...';
      }

      if (error) {
        return `Error! ${error.message}`;
      }
      return <DashBoard data={data.users} currentUser={userData} />;
    }}
  </Query>
);
