import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react"
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { RootLayout } from "@/components/shared/Layout";
import '@/common/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <AntdRegistry>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AntdRegistry>
  )
}