import { Alert } from 'antd';
import * as React from 'react';
import SignIn from '../components/signIn/SignIn';

export default () => (
  <React.Fragment>
    <SignIn />

    <Alert
      message="Test User credentials"
      description={
        <span>
          <b>Login</b>: test@test.com
          <br />
          <b>Password</b>: testpass
        </span>
      }
      type="info"
      showIcon
      className="alert"
    />

    <style jsx global>{`
      .alert {
        margin-top: 20px;
      }
    `}</style>
  </React.Fragment>
);
