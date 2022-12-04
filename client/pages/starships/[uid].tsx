import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Starship from '../../types/Starship';

type Props = {
  starship: Starship;
};

const Starship: NextPage<Props> = ({ starship }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium'>{starship.properties.name}</h1>
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
