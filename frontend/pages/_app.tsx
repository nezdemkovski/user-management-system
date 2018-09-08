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

class MyApp extends App {
  public static async getInitialProps({ ctx }) {
    const { currentUser } = await checkLoggedIn(ctx.apolloClient);

    // if (ctx.pathname === '/signin' || ctx.pathname === '/create-account') {
    //   if (currentUser.user) {
    //     redirect(ctx, '/');
    //   }
    // }

    // if (ctx.pathname === '/admin') {
    //   if (isEmpty(currentUser) || currentUser.user.role !== 'MODERATOR') {
    //     redirect(ctx, '/');
    //   }
    // }

    if (currentUser.user) {
      return { isAuth: true, userData: currentUser.user };
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
