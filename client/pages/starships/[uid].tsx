import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Starship from '../../types/Starship';
import { capitalizeString } from '../../utils/format';

type Props = {
  starship: Starship;
};

const Starship: NextPage<Props> = ({ starship }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {starship.properties.name}
        </h1>
        <p className='mt-6 text-2xl underline'>Characteristic</p>
        <table className='w-1/2 mt-3 text-lg text-center'>
          <tbody>
            <tr>
              <th className='border border-sw-yellow'>Model</th>
              <td className='border border-sw-yellow'>
                {starship.properties.model}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Class</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(starship.properties.starship_class)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Manufacturer</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(starship.properties.manufacturer)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Cost (Galactic Credits)</th>
              <td className='border border-sw-yellow'>
                {starship.properties.cost_in_credits}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Length</th>
              <td className='border border-sw-yellow'>
                {starship.properties.length} m
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Crew</th>
              <td className='border border-sw-yellow'>
                {starship.properties.crew}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Passengers</th>
              <td className='border border-sw-yellow'>
                {starship.properties.passengers}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Max atmosphering speed</th>
              <td className='border border-sw-yellow'>
                {starship.properties.max_atmosphering_speed}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Hyperdrive rating</th>
              <td className='border border-sw-yellow'>
                {starship.properties.hyperdrive_rating}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Maximum number of Megalights (MGLT)</th>
              <td className='border border-sw-yellow'>
                {starship.properties.MGLT}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Cargo capacity</th>
              <td className='border border-sw-yellow'>
                {starship.properties.cargo_capacity} kg
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Consumable capacity without resupply (for entire crew)</th>
              <td className='border border-sw-yellow'>
                {starship.properties.consumables}
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

  const starship: Starship = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'starships',
    },
    headers: {
      'Accept-Encoding': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch((error) => null);

  return {
    props: {
      starship: starship,
    },
  };
};

export default Starship;
