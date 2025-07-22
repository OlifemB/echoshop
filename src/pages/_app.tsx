import { AppProps } from "next/app";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { RootLayout } from "@/components/shared/Layout";
import '@/common/styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntdRegistry>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AntdRegistry>
  )
}