import { Layout } from 'antd';
import { withRouter } from 'next/router';
import * as React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

interface Props {
  isAuth: boolean;
  userData: any;
  signOut: () => void;
  children: React.ReactNode;
}

class LayoutComponent extends React.Component<Props> {
  public render() {
    const { isAuth, userData, signOut, children } = this.props;

    return (
      <React.Fragment>
        <Layout className="layout">
          <Header isAuth={isAuth} userData={userData} signOut={signOut} />

          <Layout.Content className="content">
            <div>{children}</div>
          </Layout.Content>
          <Footer />
        </Layout>

        <style jsx global>{`
          .layout {
            height: 100vh;
          }

          .content {
            padding: 0 20px;
            margin-top: 20px;
          }

          .content > div {
            padding: 24px;
            background: #ffffff;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default withRouter(LayoutComponent);
