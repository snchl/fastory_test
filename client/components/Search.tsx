import axios from 'axios';
import { NextComponentType } from 'next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmsState } from '../store/filmSlice';
import { selectPeoplesState, setPeoplesState } from '../store/peopleSlice';
import { setPlanetsState } from '../store/planetSlice';
import { setSpeciesState } from '../store/specySlice';
import { setStarshipsState } from '../store/starshipSlice';
import { setVehiclesState } from '../store/vehicleSlice';

const Search: NextComponentType = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);

  const dispatch = useDispatch();

  const handleSearchChange = (target: HTMLInputElement) => {
    setSearchQuery(target.value);
  };
  const search = async () => {
    setSearchLoad(true);
    await axios('/api/swapi', {
      params: {
        search: searchQuery,
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
    setSearchLoad(false);
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
        onClick={search}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
