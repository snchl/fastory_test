import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilmsState, setFilmsState } from '../store/filmSlice';
import { selectPeoplesState, setPeoplesState } from '../store/peopleSlice';
import { selectPlanetsState, setPlanetsState } from '../store/planetSlice';
import { selectSpeciesState, setSpeciesState } from '../store/specySlice';
import {
  selectStarshipsState,
  setStarshipsState,
} from '../store/starshipSlice';
import { selectVehiclesState, setVehiclesState } from '../store/vehicleSlice';

const SearchResultList = () => {
  const films = useSelector(selectFilmsState);
  const peoples = useSelector(selectPeoplesState);
  const planets = useSelector(selectPlanetsState);
  const species = useSelector(selectSpeciesState);
  const starships = useSelector(selectStarshipsState);
  const vehicles = useSelector(selectVehiclesState);

  const dispatch = useDispatch();

  const haveResult = () => {
    return (
      films.length > 0 ||
      peoples.length > 0 ||
      planets.length > 0 ||
      species.length > 0 ||
      starships.length > 0 ||
      vehicles.length > 0
    );
  };

  const resetResults = () => {
    dispatch(setFilmsState([]));
    dispatch(setPeoplesState([]));
    dispatch(setPlanetsState([]));
    dispatch(setSpeciesState([]));
    dispatch(setStarshipsState([]));
    dispatch(setVehiclesState([]));
  };

  return (
    <div className='space-y-4'>
      {haveResult() && (
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-medium'>Search results</h2>
          <button className='px-2 py-0.5 text-black rounded-md bg-sw-yellow' onClick={resetResults}>Reset</button>
        </div>
      )}
      {films.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Films ({films.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {films.map((film) => {
              return (
                <li key={`film-${film.uid}`}>
                  <Link href={`/films/${film.uid}`}>
                    {film.properties.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {peoples.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Peoples ({peoples.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {peoples.map((people) => {
              return (
                <li key={`people-${people.uid}`}>
                  <Link href={`/peoples/${people.uid}`}>
                    {people.name || people.properties.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {planets.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Planets ({planets.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {planets.map((planet) => {
              return (
                <li key={`planet-${planet.uid}`}>
                  <Link href={`/planets/${planet.uid}`}>
                    {planet.name || planet.properties.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {starships.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Starships ({starships.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {starships.map((starship) => {
              return (
                <li key={`starship-${starship.uid}`}>
                  <Link href={`/starships/${starship.uid}`}>
                    {starship.name || starship.properties.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {species.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Species ({species.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {species.map((specy) => {
              return (
                <li key={`specy-${specy.uid}`}>
                  <Link href={`/species/${specy.uid}`}>
                    {specy.name || specy.properties.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {vehicles.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b cursor-pointer'>
            Vehicles ({vehicles.length})
          </summary>
          <ul className='py-2 pl-6 space-y-2 list-disc'>
            {vehicles.map((vehicle) => {
              return (
                <li key={`vehicle-${vehicle.uid}`}>
                  <Link href={`/vehicles/${vehicle.uid}`}>
                    {vehicle.name || vehicle.properties.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      )}
    </div>
  );
};

export default SearchResultList;
