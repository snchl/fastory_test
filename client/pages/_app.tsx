import '../styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className='flex h-screen pt-20'>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
