import { Switch as AntSwitch } from 'antd';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { USER_FRAGMENT } from '../pages/dashboard';

interface Props {
  userId: string;
  isActive: boolean;
}

class Switch extends React.Component<Props> {
  public UPDATE_USER = gql`
    mutation updateUser($id: ID!, $active: Boolean!) {
      updateUser(id: $id, update: { active: $active }) {
        ...UserData
      }
    }
    ${USER_FRAGMENT}
  `;

  public onChange = async updateUser => {
    const { userId, isActive } = this.props;

    return updateUser({
      variables: { id: userId, active: !isActive },
    });
  };

  public render() {
    return (
      <Mutation mutation={this.UPDATE_USER}>
        {(updateUser, { error }) => {
          if (error) {
            return <p>Error :(</p>;
          }

          return (
            <AntSwitch
              checkedChildren="Active user"
              unCheckedChildren="Inactive user"
              checked={this.props.isActive}
              onChange={() => this.onChange(updateUser)}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default Switch;
