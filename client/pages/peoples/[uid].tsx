import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import People from '../../types/People';
import { capitalizeString } from '../../utils/format';

type Props = {
  people: People;
};

const People: NextPage<Props> = ({ people }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {people.properties.name}
        </h1>
        <p className='mt-6 text-2xl underline'>Informations</p>
        <div className='mt-3 text-lg'>
          <p>Birth year: {people.properties.birth_year}</p>
        </div>
        <p className='mt-6 text-2xl underline'>Characteristic</p>
        <table className='w-1/2 mt-3 text-lg text-center'>
          <tbody>
            <tr>
              <th className='border border-sw-yellow'>Gender</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(people.properties.gender)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Skin color</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(people.properties.skin_color)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Hair color</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(people.properties.hair_color)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Eye color</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(people.properties.eye_color)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Height</th>
              <td className='border border-sw-yellow'>
                {people.properties.height} cm
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Mass</th>
              <td className='border border-sw-yellow'>
                {people.properties.mass} kg
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
    .catch(() => {
      error = true;
    });

  if (error) {
    return {
      redirect: {
        destination: `/not-found?type=people&id=${uid}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        people: people,
      },
    };
  }
};

export default People;
