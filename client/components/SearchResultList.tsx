import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectFilmsState } from '../store/filmSlice';
import { selectPeoplesState } from '../store/peopleSlice';
import { selectPlanetsState } from '../store/planetSlice';
import { selectSpeciesState } from '../store/specySlice';
import { selectStarshipsState } from '../store/starshipSlice';
import { selectVehiclesState } from '../store/vehicleSlice';

const SearchResultList = () => {
  const films = useSelector(selectFilmsState);
  const peoples = useSelector(selectPeoplesState);
  const planets = useSelector(selectPlanetsState);
  const species = useSelector(selectSpeciesState);
  const starships = useSelector(selectStarshipsState);
  const vehicles = useSelector(selectVehiclesState);

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

  return (
    <div className='space-y-4'>
      {haveResult() && <h2 className='text-2xl font-medium'>Search results</h2>}
      {films.length > 0 && (
        <details>
          <summary className='text-xl font-medium border-b'>
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
          <summary className='text-xl font-medium border-b'>
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
          <summary className='text-xl font-medium border-b'>
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
          <summary className='text-xl font-medium border-b'>
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
          <summary className='text-xl font-medium border-b'>
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
          <summary className='text-xl font-medium border-b'>
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
