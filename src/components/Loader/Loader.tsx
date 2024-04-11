import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from './loader.json';
import styles from './Loader.module.scss';

type TLoader = {
  isLoading: boolean;
}

const Loader: React.FC<TLoader> = ({ isLoading }) => {
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = ''; 
      window.removeEventListener('scroll', preventScroll);
    }

    return () => {
      window.removeEventListener('scroll', preventScroll);
    };
  }, [isLoading]);

  return (
    <div id='loader' className={styles.back} style={!isLoading ? { display: 'none' } : {}}>
      <Lottie
        isClickToPauseDisabled
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        height={200}
        width={200}
        options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
        }}
      />
    </div>
  );
}

export default Loader;
