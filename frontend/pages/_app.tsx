import cookie from 'cookie';
import isEmpty from 'lodash/isEmpty';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import Layout from '../components/layout/Layout';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withApollo from '../lib/withApollo';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props {
  isAuth: boolean;
  userData: any;
  children: React.ReactNode;
}

class MyApp extends App<Props> {
  public static async getInitialProps({ ctx }) {
    const { currentUser } = await checkLoggedIn(ctx.apolloClient);

    if (ctx.pathname === '/') {
      if (currentUser.currentUser) {
        redirect(ctx, '/dashboard');
      }
    }

    if (ctx.pathname === '/dashboard') {
      if (isEmpty(currentUser)) {
        redirect(ctx, '/');
      }
    }

    if (currentUser.currentUser) {
      return { isAuth: true, userData: currentUser.currentUser };
    }

    return { isAuth: false, userData: {} };
  }

  public signOut = () => {
    this.props.apolloClient.cache.reset().then(() => {
      redirect({}, '/');

      document.cookie = cookie.serialize('token', '', {
        maxAge: -1,
      });
    });
  };

  public render() {
    const { Component, pageProps, apolloClient, isAuth, userData } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Layout isAuth={isAuth} userData={userData} signOut={this.signOut}>
            <Component {...pageProps} userData={userData} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
