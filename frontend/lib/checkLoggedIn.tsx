import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../pages/dashboard';

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      ...UserData
    }
  }
  ${USER_FRAGMENT}
`;

export default async apolloClient => {
  try {
    const currentUser = await apolloClient.query({
      query: CURRENT_USER,
    });

    if (currentUser.data) {
      return { currentUser: currentUser.data };
    }
  } catch (e) {
    return { currentUser: {} };
  }
};
