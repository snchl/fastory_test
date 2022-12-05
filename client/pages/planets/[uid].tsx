import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Planet from '../../types/Planet';
import { capitalizeString } from '../../utils/format';

type Props = {
  planet: Planet;
};

const Planet: NextPage<Props> = ({ planet }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {planet.properties.name}
        </h1>
        <p className='mt-6 text-2xl underline'>Characteristic</p>
        <table className='w-1/2 mt-3 text-lg text-center'>
          <tbody>
            <tr>
              <th className='border border-sw-yellow'>Diameter</th>
              <td className='border border-sw-yellow'>
                {planet.properties.diameter} km
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Gravity</th>
              <td className='border border-sw-yellow'>
                {planet.properties.gravity}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Orbital period</th>
              <td className='border border-sw-yellow'>
                {planet.properties.orbital_period} days
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Rotation period</th>
              <td className='border border-sw-yellow'>
                {planet.properties.rotation_period} hours
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Climate</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(planet.properties.climate)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Terrain</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(planet.properties.terrain)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Surface water</th>
              <td className='border border-sw-yellow'>
                {planet.properties.surface_water} %
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Population</th>
              <td className='border border-sw-yellow'>
                {planet.properties.population}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;
  let error: boolean = false;

  const planet: Planet = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'planets',
    },
    headers: {
      'Accept-Encoding': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(() => {
      error = true;
    });

  if (error) {
    return {
      redirect: {
        destination: `/not-found?type=planet&id=${uid}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        planet: planet,
      },
    };
  }
};

export default Planet;
