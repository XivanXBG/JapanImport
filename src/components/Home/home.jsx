
import { useState, useEffect } from 'react';
import styles from './home.module.css'; // Import the CSS module
import FormSearch from '../SearchForms/FormSearch';
import AdvancedSearch from '../SearchForms/AdvancedFormSearch';
import Car from './car';
import { connect } from 'react-redux';
import { updateSearchCriteria } from '../../reducer/actions';

const Home = ({dispatch}) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(true);
    const [isAdSerachVisible, setIsAdSerachVisible] = useState(false);



   
    const backgroundImages = [
        'url(https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iUmkMBelSPPU/v1/-1x-1.jpg)',
        'url(https://www.nippon.com/en/ncommon/contents/japan-topics/2470496/2470496.jpg)',
        'url(https://images.squarespace-cdn.com/content/v1/57825361440243db4a4b7830/1595331815543-2MA2FLF8ZNCC9AVRCFS3/showa-racing-bosozoku-kaido-racer-japanese-cars-tuning-tokyo-car-culture9.jpg)',

    ];

    useEffect(() => {
        const changeBackground = () => {
            const randomIndex = Math.floor(Math.random() * backgroundImages.length);
            const randomImage = backgroundImages[randomIndex];
            setBackgroundImage(randomImage);
        };

        const intervalId = setInterval(changeBackground, 10000);

        changeBackground();


        return () => clearInterval(intervalId);
    }, [backgroundImages]);

    return (
        <>
            <div
                className={styles.body}
            >
                <div
                    className={styles.background}
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div>
                        <div className="link-container">
                            <span onClick={() => {setIsSearchVisible(true); setIsAdSerachVisible(false)}} className="searchLink">
                                Search
                            </span>
                            <span onClick={() => {setIsAdSerachVisible(true); setIsSearchVisible(false)}} className="searchLink">
                                Advanced Search
                            </span>
                        </div>

                        {isSearchVisible && (
                            <FormSearch />
                        )}

                        {isAdSerachVisible && (
                            <AdvancedSearch />
                        )}
                        
                    </div>


                </div>
                <div className={styles.cardsContainer}>
                    <Car customDispatch={dispatch} />
                </div >
            </div>


        </>
    );
};

export default connect()(Home);
