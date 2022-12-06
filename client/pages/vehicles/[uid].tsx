import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Vehicle from '../../types/Vehicle';
import { capitalizeString } from '../../utils/format';

type Props = {
  vehicle: Vehicle;
};

const Vehicle: NextPage<Props> = ({ vehicle }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {vehicle.properties.name}
        </h1>
        <p className='mt-6 text-2xl underline'>Characteristic</p>
        <table className='w-1/2 mt-3 text-lg text-center'>
          <tbody>
            <tr>
              <th className='border border-sw-yellow'>Model</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.model}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Class</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(vehicle.properties.vehicle_class)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Manufacturer</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.manufacturer}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Length</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.length} m
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>
                Cost (Galactic Credits)
              </th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.cost_in_credits}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Crew</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.crew}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Passengers</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.passengers}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>
                Max atmosphering speed
              </th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.max_atmosphering_speed}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Cargo capacity</th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.cargo_capacity} kg
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>
                Consumable capacity without resupply (for entire crew)
              </th>
              <td className='border border-sw-yellow'>
                {vehicle.properties.consumables}
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

  const vehicle: Vehicle = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'vehicles',
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
        destination: `/not-found?type=vehicle&id=${uid}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        vehicle: vehicle,
      },
    };
  }
};

export default Vehicle;
