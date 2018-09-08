import { Layout } from 'antd';
import * as React from 'react';

const Footer = () => (
  <Layout.Footer className="footer">
    <p>2018, Yuri Yakovlev.</p>

    <style jsx global>{`
      .footer {
        text-align: center;
      }
    `}</style>
  </Layout.Footer>
);

export default Footer;
