import { Layout } from 'antd';
import { withRouter } from 'next/router';
import * as React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

class LayoutComponent extends React.Component {
  public render() {
    const { isAuth, userData, signOut, router, children } = this.props;
    const isHomePage = router.pathname === '/';

    return (
      <React.Fragment>
        <Layout className={`layout ${isHomePage ? 'home' : ''}`}>
          <Header isAuth={isAuth} userData={userData} signOut={signOut} />

          {isHomePage ? (
            <div>{children}</div>
          ) : (
            <Layout.Content style={{ padding: '0 20px', marginTop: 20 }}>
              <div style={{ padding: 24, background: '#fff' }}>{children}</div>
            </Layout.Content>
          )}

          {/* <Footer className="footer" /> */}
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(LayoutComponent);
