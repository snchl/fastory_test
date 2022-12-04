import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import People from '../../types/People';

type Props = {
  people: People;
};

const People: NextPage<Props> = ({ people }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium'>{people.properties.name}</h1>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;

  const people: People = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'people',
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
      people: people,
    },
  };
};

export default People;
