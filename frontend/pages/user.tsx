import gql from 'graphql-tag';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import * as React from 'react';
import { Query } from 'react-apollo';

import UserPage from '../components/userPage/UserPage';
import { User, USER_FRAGMENT } from '../pages/dashboard';

interface Props {
  router: WithRouterProps['router'];
  userData: User;
}

const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      ...UserData
    }
  }
  ${USER_FRAGMENT}
`;

const UserContainer = ({ router, userData }: Props) => (
  <React.Fragment>
    <div className="link-back">
      <Link href="/dashboard">
        <a>Back to dashboard</a>
      </Link>
    </div>

    <Query query={GET_USER} variables={{ id: router.query.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error! ${error.message}</p>;
        }

        return <UserPage data={data.user} currentUser={userData} />;
      }}
    </Query>

    <style jsx>{`
      .link-back {
        margin-bottom: 30px;
      }
    `}</style>
  </React.Fragment>
);

export default withRouter(UserContainer);
