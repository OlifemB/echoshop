import React from 'react';
import { Layout } from "antd";

export const Footer = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center', background: '#f0f2f5' }} className="shadow-inner mt-auto">
      EchoShop ©2025 by <a href={'https://github.com/OlifemB'} className={'underline'}>Olifem</a>
    </Layout.Footer>
  );
};