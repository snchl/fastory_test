import axios from 'axios';
import { NextComponentType } from 'next';
import Image from 'next/image';
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
import { capitalizeString } from '../utils/format';
import { useEffect, useState } from 'react';

const Search: NextComponentType = () => {
  const filterOptions = [
    'all',
    'people',
    'films',
    'starships',
    'vehicles',
    'species',
    'planets',
  ];

  const [filter, setFilter] = useState('all');
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

  const resetResults = () => {
    dispatch(setFilmsState([]));
    dispatch(setPeoplesState([]));
    dispatch(setPlanetsState([]));
    dispatch(setSpeciesState([]));
    dispatch(setStarshipsState([]));
    dispatch(setVehiclesState([]));
  };

  const search = async (query: string) => {
    if (!searchLoad && query) {
      dispatch(setSearchLoadState(true));
      await axios('/api/swapi', {
        params: {
          type: filter === 'all' ? undefined : filter,
          search: query,
        },
      })
        .then((response) => {
          resetResults();
          if (filter === 'all') {
            dispatch(setFilmsState(response.data.films));
            dispatch(setPeoplesState(response.data.people));
            dispatch(setPlanetsState(response.data.planets));
            dispatch(setSpeciesState(response.data.species));
            dispatch(setStarshipsState(response.data.starships));
            dispatch(setVehiclesState(response.data.vehicles));
          } else {
            switch (filter) {
              case 'films':
                dispatch(setFilmsState(response.data));
                break;
              case 'people':
                dispatch(setPeoplesState(response.data));
                break;
              case 'planets':
                dispatch(setPlanetsState(response.data));
                break;
              case 'species':
                dispatch(setSpeciesState(response.data));
                break;
              case 'starships':
                dispatch(setStarshipsState(response.data));
                break;
              case 'vehicles':
                dispatch(setVehiclesState(response.data));
                break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(setSearchLoadState(false));
    }
  };
  const searchWithDebounce = debounce(search, 500);

  useEffect(() => {
    searchWithDebounce(searchQuery);
  }, [searchQuery]);
  useEffect(() => {
    search(searchQuery);
  }, [filter]);

  return (
    <>
      <div className='flex items-center gap-x-2'>
        <input
          type='text'
          className='flex-1 w-full px-2 py-1 text-lg text-white bg-transparent border rounded-md outline-none border-sw-yellow ring-1 ring-transparent hover:ring-sw-yellow focus:ring-sw-yellow'
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <select
          className='bg-transparent border rounded-md outline-none border-sw-yellow'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {capitalizeString(option)}
            </option>
          ))}
        </select>
      </div>
      {searchLoad && (
        <div className='flex justify-center'>
          <Image src={loadGif} alt='load-animation' className='h-auto w-36' />
        </div>
      )}
    </>
  );
};

export default Search;
