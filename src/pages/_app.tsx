import { useCartStore, useFavoritesStore } from "@/common/store";
import { AppProps } from "next/app";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { RootLayout } from "@/components/shared/Layout";
import '@/common/styles/globals.css'
import { useEffect } from "react";


function App({ Component, pageProps }: AppProps) {
  const initializeCart = useCartStore((state) => state.initializeFromLocalStorage);
  const initializeFavorites = useFavoritesStore((state) => state.initializeFromLocalStorage);

  // Call hydration functions only on the client after initial render
  useEffect(() => {
    initializeCart();
    initializeFavorites();
  }, [initializeCart, initializeFavorites]);

  return (
    <AntdRegistry>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AntdRegistry>
  );
}

export default App;