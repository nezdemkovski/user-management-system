import { message, Alert, Button, Form, Input, Modal, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { GET_USER_LIST, USER_FRAGMENT } from '../pages/dashboard';

interface State {
  confirmDirty: boolean;
  visible: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class CreateUserModalForm extends React.Component<FormComponentProps, State> {
  public state = {
    confirmDirty: false,
    visible: false,
  };

  public CREATE_NEW_USER = gql`
    mutation createUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
      $role: UserRole!
      $profilePictureUrl: String!
    ) {
      createUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        role: $role
        profilePictureUrl: $profilePictureUrl
      ) {
        user {
          ...UserData
        }
      }
    }
    ${USER_FRAGMENT}
  `;

  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  public handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  public handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  public handleSubmit = createUser => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const createdUser = await createUser({
          variables: { ...values },
        });

        if (createdUser) {
          message.success('User successfully created');
          this.handleOk();
        }
      }
    });
  };

  public handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  public compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  public validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <div className="button-add-user">
          <Button onClick={this.showModal}>Add new user</Button>
        </div>
        <Mutation
          mutation={this.CREATE_NEW_USER}
          update={(cache, { data: { createUser } }) => {
            const data: any = cache.readQuery({ query: GET_USER_LIST });

            cache.writeQuery({
              query: GET_USER_LIST,
              data: {
                users: [...data.users, createUser.user],
              },
            });
          }}
        >
          {(createUser, { error }) => {
            return (
              <Modal
                title="Create New User"
                visible={this.state.visible}
                okText="Create"
                onOk={() => this.handleSubmit(createUser)}
                onCancel={this.handleCancel}
              >
                <Form>
                  {error && (
                    <Alert
                      className="error-alert"
                      message="Error"
                      description={error.message}
                      type="error"
                    />
                  )}
                  <Form.Item
                    {...formItemLayout}
                    label={<span>First Name</span>}
                  >
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your First Name!',
                          whitespace: true,
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label={<span>Last Name</span>}>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Last Name!',
                          whitespace: true,
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="E-mail">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid email!',
                        },
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Password">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        {
                          validator: this.validateToNextPassword,
                        },
                      ],
                    })(<Input type="password" />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator('confirm', {
                      rules: [
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        {
                          validator: this.compareToFirstPassword,
                        },
                      ],
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />,
                    )}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label={<span>User Role</span>}>
                    {getFieldDecorator('role', {
                      initialValue: 'ADMIN',
                    })(
                      <Radio.Group size="large">
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
                      initialValue:
                        'https://avatars1.githubusercontent.com/u/4764539',
                      rules: [
                        {
                          required: true,
                          message: 'Please input URL of your Profile picture!',
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Form>
              </Modal>
            );
          }}
        </Mutation>
        <style jsx global>{`
          .button-add-user {
            text-align: center;
            margin-top: 12px;
            height: 32px;
            line-height: 32px;
          }

          .error-alert {
            margin-bottom: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

const CreateUserModal = Form.create()(CreateUserModalForm);
export default CreateUserModal;
