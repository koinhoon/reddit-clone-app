import axios from 'axios';
import Axios from 'axios';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { AuthProvider } from '../context/auth';
import NavBar from '../components/NavBar';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;
  
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  const fetcher = async (url : string) => {
  try {
        const res = await axios.get(url);
        return res.data;
    } catch(error: any) {
        throw error.response.data;
    }
  }
  return <>
    <Head>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js" crossOrigin="anonymous"></script>
    </Head>
    <SWRConfig
          value={{
            fetcher
          }}
        >
        <AuthProvider> 
        {!authRoute && <NavBar /> }
        <div className={authRoute ? "" : "pt-12 bg-gray-200 min-h-screen"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  </> 
}