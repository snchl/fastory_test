import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DataType from '../types/DataType';

type Query = {
  type: DataType;
  id: string;
};

const NotFound: NextPage = () => {
  const router = useRouter();

  const { type, id } = router.query as Query;

  return (
    <div className='flex justify-center w-full'>
      <div className='space-y-10 text-center'>
        <h1 className='text-5xl'>Oups, not found !</h1>
        <p className='text-2xl'>
          Sorry, the {type} with id {id} does not exist or was not found.
        </p>
        <div>
          <Link href='/' className='text-2xl text-white hover:text-sw-yellow'>
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
