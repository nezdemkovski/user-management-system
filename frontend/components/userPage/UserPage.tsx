import { message, Alert, Button, Form, Input, Modal, Radio } from 'antd';
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

class EditUserPage extends React.Component<Props> {
  public handleSubmit = (e, updateUser) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const updatedUser = await updateUser({
          variables: { ...values, id: this.props.data.id },
        });

        if (updatedUser) {
          message.success('User successfully updated');
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
              <Form onSubmit={e => this.handleSubmit(e, updateUser)}>
                {error && (
                  <Alert
                    className="error-alert"
                    message="Error"
                    description={error.message}
                    type="error"
                  />
                )}

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
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}

const UserPage = Form.create()(EditUserPage);
export default UserPage;

{
  /* <Form.Item {...formItemLayout} label="Password">
{getFieldDecorator('password', {
  rules: [
    {
      message: 'Please input your password!',
    },
  ],
})(<Input type="password" />)}
</Form.Item> */
}
