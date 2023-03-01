import React from 'react';
import Postbar from './Postbar/Postbar';
import TopSlider from './TopSlider/TopSlider';
import "../SharedPages/DefaultCss/DefaulCss.css"

const Home = () => {
    return (
       <div className='home'>
         <div className='conatiner mx-auto'>
            <TopSlider/>
            <Postbar/>
            
        </div>
       </div>
    );
};

export default Home;