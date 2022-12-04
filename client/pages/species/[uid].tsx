import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Specy from '../../types/Specy';

type Props = {
  specy: Specy;
};

const Specy: NextPage<Props> = ({ specy }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium'>{specy.properties.name}</h1>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;

  const specy: Specy = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'species',
    },
    headers: {
      'Accept-Encoding': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch((error) => null);

  return {
    props: {
      specy: specy,
    },
  };
};

export default Specy;
