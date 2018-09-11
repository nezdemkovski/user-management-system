import { Alert, Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import cookie from 'cookie';
import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, Mutation, WithApolloClient } from 'react-apollo';
import redirect from '../../lib/redirect';

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignIn extends React.Component<WithApolloClient<FormComponentProps>> {
  public componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  public handleSubmit = (e, signInUser) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const loggedInUser = await signInUser({
          variables: { ...values },
        });

        if (loggedInUser) {
          await this.props.client.cache.reset();
          redirect({}, '/dashboard');
        }
      }
    });
  };

  public render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');

    return (
      <React.Fragment>
        <Mutation
          mutation={SIGN_IN}
          onCompleted={async data => {
            document.cookie = cookie.serialize('token', data.signInUser.token, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
            });
            try {
              await this.props.client.cache.reset();
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
            <Form
              layout="inline"
              onSubmit={e => this.handleSubmit(e, signInUser)}
            >
              {error && (
                <Alert
                  className="error-alert"
                  message="Error"
                  description={error.message}
                  type="error"
                />
              )}
              <Form.Item
                validateStatus={emailError ? 'error' : 'validating'}
                help={emailError || ''}
              >
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="email"
                  />,
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : 'validating'}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Mutation>

        <style jsx global>{`
          .error-alert {
            margin-bottom: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

const SignInContainer = Form.create()(SignIn);
export default withApollo(SignInContainer);
