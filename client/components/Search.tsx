import { NextComponentType } from 'next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchLoad, setSearchLoad } from '../store/searchSlice';

const Search: NextComponentType = () => {
  const dispatch = useDispatch();
  const searchLoad = useSelector(selectSearchLoad);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (target: HTMLInputElement) => {
    setSearchQuery(target.value);
  };

  return (
    <div>
      <input
        type='text'
        className='flex-1 w-full px-2 py-1 text-lg text-white bg-transparent border rounded-md outline-none border-sw-yellow ring-1 ring-transparent hover:ring-sw-yellow focus:ring-sw-yellow'
        value={searchQuery}
        onChange={(event) =>
          handleSearchChange(event.target as HTMLInputElement)
        }
      />
      <button
        className='w-full mt-2 text-black rounded-md bg-sw-yellow'
        onClick={() => dispatch(setSearchLoad(true))}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
