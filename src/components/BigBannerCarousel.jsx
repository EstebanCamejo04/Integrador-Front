import Carousel from "react-bootstrap/Carousel";
import "../styles/App.css";

const BigBannerCarousel = ({ info }) => {
  return (
    <>
      <div className="relative">
        <div className="abs-bb">
          <h1>{info.title}</h1>
          {/* <h2>
            {info.description}{" "}
            <span className="span-heart">{info.highlighted_description}</span>
          </h2> */}
        </div>
        <Carousel>
          <Carousel.Item>
            <div className="big-banner">
              <img src={info.image_path_1} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="big-banner">
              <img src={info.image_path_2} />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="big-banner">
              <img src={info.image_path_3} />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default BigBannerCarousel;
