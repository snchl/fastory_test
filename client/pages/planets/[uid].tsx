import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Planet from '../../types/Planet';

type Props = {
  planet: Planet;
};

const Planet: NextPage<Props> = ({ planet }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium'>{planet.properties.name}</h1>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;

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
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      planet: planet,
    },
  };
};

export default Planet;
