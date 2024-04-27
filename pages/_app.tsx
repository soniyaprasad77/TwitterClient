import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query-devtools";
const queryclient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <GoogleOAuthProvider clientId="244588239997-j8v01vlhn63svfonf39c7qphd5agdmk4.apps.googleusercontent.com">
          <Component {...pageProps} />
          <Toaster />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
