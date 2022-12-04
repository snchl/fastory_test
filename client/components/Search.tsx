import axios from 'axios';
import { NextComponentType } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmsState } from '../store/filmSlice';
import { setPeoplesState } from '../store/peopleSlice';
import { setPlanetsState } from '../store/planetSlice';
import {
  selectSearchLoadState,
  setSearchLoadState,
} from '../store/searchSlice';
import { setSpeciesState } from '../store/specySlice';
import { setStarshipsState } from '../store/starshipSlice';
import { setVehiclesState } from '../store/vehicleSlice';
import loadGif from '../assets/images/load.gif';

const Search: NextComponentType = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchLoad = useSelector(selectSearchLoadState);
  const dispatch = useDispatch();

  const debounce = (fn: Function, time: number) => {
    let searchTimeout: NodeJS.Timeout | null;
    const wrapper = (query: string) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchTimeout = null;
        fn(query);
      }, time);
    };
    return wrapper;
  };

  const search = debounce(async (query: string) => {
    if (!searchLoad && query) {
      dispatch(setSearchLoadState(true));
      await axios('/api/swapi', {
        params: {
          search: query,
        },
      })
        .then((response) => {
          dispatch(setFilmsState(response.data.films));
          dispatch(setPeoplesState(response.data.people));
          dispatch(setPlanetsState(response.data.planets));
          dispatch(setSpeciesState(response.data.species));
          dispatch(setStarshipsState(response.data.starships));
          dispatch(setVehiclesState(response.data.vehicles));
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(setSearchLoadState(false));
    }
  }, 500);

  const handleSearchChange = (query: string) => {
    search(query);
  };

  return (
    <div>
      <input
        type='text'
        className='flex-1 w-full px-2 py-1 text-lg text-white bg-transparent border rounded-md outline-none border-sw-yellow ring-1 ring-transparent hover:ring-sw-yellow focus:ring-sw-yellow'
        onChange={(event) =>
          handleSearchChange((event.target as HTMLInputElement).value)
        }
      />
      {searchLoad && (
        <div className='flex justify-center'>
          <Image src={loadGif} alt='load-animation' className='h-auto w-36' />
        </div>
      )}
    </div>
  );
};

export default Search;
