import gql from 'graphql-tag';

const CURRENT_USER = gql`
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
