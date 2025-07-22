import React from 'react';
import { Layout } from "antd";

export const Footer = () => {
  return (
    <Layout.Footer className="shadow-inner mt-auto bg-[#f0f2f5] text-center">
      <div className={'container flex items-center justify-center mx-auto gap-2'}>
        EchoShop ©2025 by <a href={'https://github.com/OlifemB'} className={'underline'}> Olifem </a>
      </div>
    </Layout.Footer>
  )
}