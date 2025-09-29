import '@ant-design/v5-patch-for-react-19';
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Layout } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/common/styles/globals.css'
import React from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
    <body>
    <AntdRegistry>
      <Layout className="min-h-screen flex flex-col font-sans !bg-gray-50">

        <Header/>

        <div className="flex-grow">
          {children}
        </div>

        <Footer/>
      </Layout>
    </AntdRegistry>
    </body>
    </html>
  );
}