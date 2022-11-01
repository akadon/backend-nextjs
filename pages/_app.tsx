import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default MyApp;
