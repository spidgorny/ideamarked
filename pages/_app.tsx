import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
