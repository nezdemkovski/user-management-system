import { Alert } from 'antd';
import * as React from 'react';
import SigninBox from '../components/SigninBox';

export default () => (
  <React.Fragment>
    <SigninBox />
    <Alert
      message="Test User credentials"
      description={
        <span>
          <b>Login</b>: test@test.com <br /> <b>Password</b>: testpass
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
