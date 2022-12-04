import { NextPage } from 'next';
import Search from '../components/Search';
import SearchResultList from '../components/SearchResultList';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col items-center flex-1 gap-y-10'>
      <h1 className='text-5xl font-bold'>Home</h1>
      <div className='w-1/3 space-y-10'>
        <Search />
        <SearchResultList />
      </div>
    </div>
  );
};

export default Home;
