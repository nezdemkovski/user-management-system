import { Icon, Layout, Menu } from 'antd';
import Link from 'next/link';
import * as React from 'react';

import { User } from '../../../pages/dashboard';

interface Props {
  isAuth: boolean;
  userData: User;
  signOut: () => void;
}

const Header = ({ isAuth, userData, signOut }: Props) => (
  <Layout.Header style={{ width: '100%', background: '#ffffff' }}>
    <Link href="/">
      <div className="logo" />
    </Link>

    <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
      {isAuth && (
        <Menu.SubMenu
          title={
            <span>
              <Icon type="user" theme="outlined" />
              <span>{`${userData.firstName} ${userData.lastName} (${
                userData.email
              })`}</span>
            </span>
          }
        >
          <Menu.Item key="signout">
            <a onClick={signOut}>
              <Icon type="poweroff" theme="outlined" />
              Sign Out
            </a>
          </Menu.Item>
        </Menu.SubMenu>
      )}

      {isAuth && (
        <Menu.Item key="role" disabled>
          <div
            className={`role-badge ${
              !userData.active ? 'inactive' : userData.role.toLowerCase()
            }`}
          >
            {userData.role}
          </div>
        </Menu.Item>
      )}
    </Menu>

    <style jsx>{`
      .logo {
        width: 120px;
        height: 31px;
        background: #001529;
        margin: 16px 24px 16px 0;
        float: left;
        cursor: pointer;
      }

      .role-badge {
        display: inline-block;
        padding: 0 8px;
        border-radius: 10px;
        color: #fff;
        line-height: 20px;
        font-size: 12px;
        box-shadow: 0 0 0 1px #fff;
      }

      .role-badge.admin {
        background: #52c41a;
      }

      .role-badge.developer {
        background: #1890ff;
      }

      .role-badge.editor {
        background: #f5222d;
      }

      .role-badge.inactive {
        background: #d9d9d9;
      }
    `}</style>
  </Layout.Header>
);

export default Header;
