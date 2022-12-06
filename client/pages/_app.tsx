import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <div className='flex h-screen pt-20'>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;
