import Carousel from "react-bootstrap/Carousel";
import styles from "../../styles/BigBannerCarousel.module.css";

const BigBannerCarousel = ({ info }) => {
  return (
    <>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTitleContainer}>
          <h1>{info.title}</h1>
          {/* <h2>
            {info.description}{" "}
            <span className={styles.spanHeart}>{info.highlighted_description}</span>
          </h2> */}
        </div>
        <Carousel>
          <Carousel.Item>
            <div className={styles.carouselItem}>
              <img src={info.image_path_1} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.carouselItem}>
              <img src={info.image_path_2} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className={styles.carouselItem}>
              <img src={info.image_path_3} />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default BigBannerCarousel;
