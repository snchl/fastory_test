import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Vehicle from '../../types/Vehicle';

type Props = {
  vehicle: Vehicle;
};

const Vehicle: NextPage<Props> = ({ vehicle }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium'>{vehicle.properties.name}</h1>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;

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
    .catch((error) => null);

  return {
    props: {
      vehicle: vehicle,
    },
  };
};

export default Vehicle;
