import { Icon, Layout, Menu } from 'antd';
import Link from 'next/link';
import * as React from 'react';

const Header = ({ isAuth, userData, signOut }) => (
  <Layout.Header style={{ width: '100%', background: '#ffffff' }}>
    <Link href="/">
      <div className="logo" />
    </Link>

    <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="newUser">
        <Link href="/new-user" prefetch>
          <a>
            <Icon type="form" theme="outlined" />
            Add new user
          </a>
        </Link>
      </Menu.Item>

      {!isAuth && (
        <Menu.Item key="signin">
          <Link href="/signin" prefetch>
            <a>
              <Icon type="mail" theme="outlined" />
              Sign In
            </a>
          </Link>
        </Menu.Item>
      )}

      {!isAuth && (
        <Menu.Item key="signup">
          <Link href="/create-account" prefetch>
            <a>
              <Icon type="mail" theme="outlined" />
              Sign Up
            </a>
          </Link>
        </Menu.Item>
      )}

      {isAuth &&
        userData.role === 'MODERATOR' && (
          <Menu.Item key="admin">
            <Link href="/admin" prefetch>
              <a>
                <Icon type="dashboard" theme="outlined" />
                Admin Panel
              </a>
            </Link>
          </Menu.Item>
        )}

      {isAuth && (
        <Menu.SubMenu
          title={
            <span>
              <Icon type="user" theme="outlined" />
              <span>{`${userData.name} (${userData.email})`}</span>
            </span>
          }
        >
          <Menu.Item key="profile">
            <Icon type="profile" theme="outlined" /> Profile
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" theme="outlined" /> Settings
          </Menu.Item>

          <Menu.Item key="signout">
            <a onClick={signOut}>
              <Icon type="poweroff" theme="outlined" />
              Sign Out
            </a>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>

    <style jsx global>{`
      .logo {
        width: 120px;
        height: 31px;
        background: #001529;
        margin: 16px 24px 16px 0;
        float: left;
        cursor: pointer;
      }
    `}</style>
  </Layout.Header>
);

export default Header;
