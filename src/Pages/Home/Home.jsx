// Autor: Jean Agreda
import styles from '../../components/styles.module.scss';
import Carousel from '../../components/Carousel/Carousel';
const Home = () => {

  return (

    <div className={styles.top_nav_bar}>

      <div className={styles.carousel_container}>
        <Carousel />
      </div>

      
    </div>

  );

};

export default Home;
