import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {GoogleOAuthProvider} from "@react-oauth/google";


export default function App({ Component, pageProps }: AppProps) {
  return(
  <div>
  <GoogleOAuthProvider clientId="244588239997-j8v01vlhn63svfonf39c7qphd5agdmk4.apps.googleusercontent.com">
  <Component {...pageProps} />
  </GoogleOAuthProvider>
  </div>
  );
}