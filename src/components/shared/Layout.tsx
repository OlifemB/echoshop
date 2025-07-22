import React from "react";
import { Layout } from "antd";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <Layout className="min-h-screen flex flex-col font-sans !bg-gray-50">

      <Header/>

      <Layout.Content className="flex-grow">
        {children}
      </Layout.Content>

      <Footer/>
    </Layout>
  )
}