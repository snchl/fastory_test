import { ChangeEventHandler, useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (target: HTMLInputElement) => {
    setSearchQuery(target.value);
  };

  return (
    <input
      type='text'
      className='flex-1 w-full px-2 py-1 text-lg text-white bg-transparent border rounded-md outline-none border-sw-yellow ring-1 ring-transparent hover:ring-sw-yellow focus:ring-sw-yellow'
      value={searchQuery}
      onChange={(event) => handleSearchChange(event.target as HTMLInputElement)}
    />
  );
};

export default Search;
