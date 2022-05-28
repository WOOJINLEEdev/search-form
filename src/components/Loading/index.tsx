import LoadingImg from 'assets/Fading circles.gif';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={LoadingImg} className={styles.loadingImage} alt='Loading...' />
    </div>
  );
};

export default Loading;
