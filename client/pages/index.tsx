import Search from '../components/Search';

const Home = () => {
  return (
    <div className='flex flex-col items-center flex-1 gap-y-10'>
      <h1 className='text-5xl font-bold'>Home</h1>
      <div className='w-1/3'>
        <Search />
      </div>
    </div>
  );
};

export default Home;
