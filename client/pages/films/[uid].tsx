import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import Film from '../../types/Film';

type Props = {
  film: Film;
};

const Film: NextPage<Props> = ({ film }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {film.properties.title}
        </h1>
        <p className='mt-4 text-xl'>{film.properties.opening_crawl}</p>
        <p className='mt-6 text-2xl underline'>Informations</p>
        <div className='grid grid-cols-2 mt-6 text-lg gap-x-10'>
          <div>
            <p>Chronology: {film.properties.episode_id}th</p>
            <p>
              Release date:{' '}
              {film.properties.release_date
                ? new Date(film.properties.release_date)
                    .toISOString()
                    .split('T')[0]
                : 'N/A'}
            </p>
          </div>
          <div>
            <p>Director: {film.properties.director}</p>
            <p>Producers: {film.properties.producer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.query;
  let error: boolean = false;

  const film: Film = await axios('http://localhost:3000/api/swapi', {
    params: {
      id: uid,
      type: 'films',
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
        destination: `/not-found?type=film&id=${uid}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        film: film,
      },
    };
  }
};

export default Film;
