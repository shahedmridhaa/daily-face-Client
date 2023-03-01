import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loding = () => {
    return (
             <div className='h-screen'>
            <div className='flex justify-center items-center h-full'>
            <PuffLoader color="#36d7b7" />
            </div>
           </div>
    );
};

export default Loding;