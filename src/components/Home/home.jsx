
import { useState, useEffect } from 'react';
import styles from './home.module.css'; // Import the CSS module
import FormSearch from '../SearchForms/FormSearch';

const Home = () => {
    const [backgroundImage, setBackgroundImage] = useState('');

    // Array of image URLs for the background
    const backgroundImages = [
        'url(https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iUmkMBelSPPU/v1/-1x-1.jpg)',
        'url(https://www.nippon.com/en/ncommon/contents/japan-topics/2470496/2470496.jpg)',
        'url(https://images.squarespace-cdn.com/content/v1/57825361440243db4a4b7830/1595331815543-2MA2FLF8ZNCC9AVRCFS3/showa-racing-bosozoku-kaido-racer-japanese-cars-tuning-tokyo-car-culture9.jpg)',
        // Add more image URLs as needed
    ];

    useEffect(() => {
        const changeBackground = () => {
            const randomIndex = Math.floor(Math.random() * backgroundImages.length);
            const randomImage = backgroundImages[randomIndex];
            setBackgroundImage(randomImage);
        };

        // Change background every 10 seconds
        const intervalId = setInterval(changeBackground, 10000);

        // Initial background change
        changeBackground();

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [backgroundImages]);

    return (
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

                    <FormSearch />
                </div>
            </div>
        </div>
    );
};

export default Home;
