import { message, Button } from 'antd';
import gql from 'graphql-tag';
import remove from 'lodash/remove';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { GET_USER_LIST } from '../pages/dashboard';

interface Props {
  id: string;
}

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

class DeleteUserButton extends React.Component<Props> {
  public onButtonClick = async deleteUser => {
    const deleted = await deleteUser({
      variables: { id: this.props.id },
    });

    if (deleted) {
      message.success('User removed');
    }
  };

  public render() {
    return (
      <Mutation
        mutation={DELETE_USER}
        update={(cache, { data: { deleteUser } }) => {
          const data: any = cache.readQuery({ query: GET_USER_LIST });
          remove(data.users, { id: deleteUser.id });
          cache.writeQuery({ query: GET_USER_LIST, data });
        }}
      >
        {(deleteUser, { error }) => {
          if (error) {
            return <p>Error :(</p>;
          }

          return (
            <Button
              type="danger"
              ghost
              onClick={() => this.onButtonClick(deleteUser)}
            >
              Delete
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteUserButton;
