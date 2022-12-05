import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Specy from '../../types/Specy';
import { capitalizeString } from '../../utils/format';

type Props = {
  specy: Specy;
};

const Specy: NextPage<Props> = ({ specy }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-2/3 mx-auto'>
        <h1 className='text-5xl font-medium underline'>
          {specy.properties.name}
        </h1>
        <p className='mt-6 text-2xl underline'>Characteristic</p>
        <table className='w-1/2 mt-3 text-lg text-center'>
          <tbody>
            <tr>
              <th className='border border-sw-yellow'>Classification</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(specy.properties.classification)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Designation</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(specy.properties.designation)}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Average lifespan</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(specy.properties.average_lifespan)}{' '}
                {specy.properties.average_lifespan !== 'unknown' && 'year'}
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Average height</th>
              <td className='border border-sw-yellow'>
                {capitalizeString(specy.properties.average_height)} cm
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Eye colors</th>
              <td className='border border-sw-yellow'>
                <ul>
                  {specy.properties.eye_colors
                    .split(', ')
                    .map((eye_color, index) => (
                      <li key={`eye-color-${index}`}>
                        {capitalizeString(eye_color)}
                      </li>
                    ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Hair colors</th>
              <td className='border border-sw-yellow'>
                <ul>
                  {specy.properties.hair_colors
                    .split(', ')
                    .map((hair_color, index) => (
                      <li key={`hair-color-${index}`}>
                        {capitalizeString(hair_color)}
                      </li>
                    ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Skin colors</th>
              <td className='border border-sw-yellow'>
                <ul>
                  {specy.properties.skin_colors
                    .split(', ')
                    .map((skin_color, index) => (
                      <li key={`skin-color-${index}`}>
                        {capitalizeString(skin_color)}
                      </li>
                    ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th className='border border-sw-yellow'>Language</th>
              <td className='border border-sw-yellow'>
                {specy.properties.language}
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
    .catch(() => {
      error = true;
    });

  if (error) {
    return {
      redirect: {
        destination: `/not-found?type=specy&id=${uid}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        specy: specy,
      },
    };
  }
};

export default Specy;
