import { Avatar, List } from 'antd';
import Link from 'next/link';
import * as React from 'react';

import CreateUserModal from './CreateUserModal';
import DeleteUserButton from './DeleteUserButton';
import Switch from './Switch';

interface Props {
  data: any;
  currentUser: any;
}

class DashBoard extends React.Component<Props> {
  public render() {
    const userHasProperRight =
      this.props.currentUser.role === 'ADMIN' ||
      this.props.currentUser.role === 'DEVELOPER';

    return (
      <React.Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              actions={[
                <Link
                  prefetch
                  href={{ pathname: '/user', query: { id: item.id } }}
                >
                  <a>Edit</a>
                </Link>,
                userHasProperRight && <DeleteUserButton id={item.id} />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.profilePictureUrl} />}
                title={
                  <span>
                    {`${item.firstName} ${item.lastName}`}
                    <span
                      className={`role-badge ${
                        !item.active ? 'inactive' : item.role.toLowerCase()
                      }`}
                    >
                      {item.role}
                    </span>

                    {this.props.currentUser.email === item.email && (
                      <span className={`role-badge me`}>ME</span>
                    )}
                  </span>
                }
                description={`${item.id} • ${item.email}`}
              />
              <Switch userId={item.id} isActive={item.active} />
            </List.Item>
          )}
        />

        {userHasProperRight && <CreateUserModal />}

        <style jsx>{`
          .role-badge {
            display: inline-block;
            padding: 0 8px;
            margin-left: 10px;
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

          .role-badge.me {
            background: #6d3333;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default DashBoard;
