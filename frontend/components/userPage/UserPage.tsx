import { message, Alert, Button, Form, Input, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { User, USER_FRAGMENT } from '../../pages/dashboard';

interface Props extends FormComponentProps {
  data: User;
  currentUser: User;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: UserRole!
    $profilePictureUrl: String!
  ) {
    updateUser(
      id: $id
      update: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        role: $role
        profilePictureUrl: $profilePictureUrl
      }
    ) {
      ...UserData
    }
  }
  ${USER_FRAGMENT}
`;

const UPDATE_USER_PASSWORD = gql`
  mutation updateUser($id: ID!, $password: String!) {
    updateUser(id: $id, update: { password: $password }) {
      ...UserData
    }
  }
  ${USER_FRAGMENT}
`;

class EditUserPage extends React.Component<Props> {
  public onUpdateUserSubmit = (e, updateUser) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const updatedUser = await updateUser({
          variables: { ...values, id: this.props.data.id },
        });

        if (updatedUser) {
          message.success('Successfully updated');
        }
      }
    });
  };

  public render() {
    const { form, currentUser, data } = this.props;
    const { getFieldDecorator } = form;

    const userHasNoEditRight = currentUser.role === 'EDITOR';

    return (
      <React.Fragment>
        <Mutation mutation={UPDATE_USER}>
          {(updateUser, { error }) => {
            return (
              <Form onSubmit={e => this.onUpdateUserSubmit(e, updateUser)}>
                {error && (
                  <Alert
                    className="error-alert"
                    message="Error"
                    description={error.message}
                    type="error"
                  />
                )}

                <p>
                  <b>User info</b>
                </p>
                <Form.Item {...formItemLayout} label={<span>First Name</span>}>
                  {getFieldDecorator('firstName', {
                    initialValue: data.firstName,
                    rules: [
                      {
                        message: 'Please input your First Name!',
                        whitespace: true,
                      },
                    ],
                  })(<Input disabled={userHasNoEditRight} />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label={<span>Last Name</span>}>
                  {getFieldDecorator('lastName', {
                    initialValue: data.lastName,

                    rules: [
                      {
                        message: 'Please input your Last Name!',
                        whitespace: true,
                      },
                    ],
                  })(<Input disabled={userHasNoEditRight} />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="E-mail">
                  {getFieldDecorator('email', {
                    initialValue: data.email,

                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid email!',
                      },
                      {
                        message: 'Please input your email!',
                      },
                    ],
                  })(<Input disabled={userHasNoEditRight} />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label={<span>User Role</span>}>
                  {getFieldDecorator('role', {
                    initialValue: data.role,
                  })(
                    <Radio.Group size="large" disabled={userHasNoEditRight}>
                      <Radio.Button value="ADMIN">Admin</Radio.Button>
                      <Radio.Button value="DEVELOPER">Developer</Radio.Button>
                      <Radio.Button value="EDITOR">Editor</Radio.Button>
                    </Radio.Group>,
                  )}
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label={<span>Profile picture URL</span>}
                >
                  {getFieldDecorator('profilePictureUrl', {
                    initialValue: data.profilePictureUrl,
                    rules: [
                      {
                        message: 'Please input URL of your Profile picture!',
                      },
                    ],
                  })(<Input disabled={userHasNoEditRight} />)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={userHasNoEditRight}
                  >
                    Update User Info
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Mutation>

        {(currentUser.role === 'ADMIN' ||
          currentUser.role === 'DEVELOPER' ||
          (currentUser.role === 'EDITOR' && currentUser.id === data.id)) && (
          <Mutation mutation={UPDATE_USER_PASSWORD}>
            {(updateUser, { error }) => {
              return (
                <Form onSubmit={e => this.onUpdateUserSubmit(e, updateUser)}>
                  {error && (
                    <Alert
                      className="error-alert"
                      message="Error"
                      description={error.message}
                      type="error"
                    />
                  )}

                  <p>
                    <b>Change password</b>
                  </p>
                  <Form.Item {...formItemLayout} label="Password">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          message: 'Please input your password!',
                        },
                      ],
                    })(<Input type="password" />)}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          </Mutation>
        )}

        <style jsx global>{`
          .error-alert {
            margin-bottom: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

const UserPage = Form.create()(EditUserPage);
export default UserPage;
