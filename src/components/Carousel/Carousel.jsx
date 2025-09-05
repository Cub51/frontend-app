
import Carousel from 'react-bootstrap/Carousel';

const CarrouselInit = () => {

    return (
        <Carousel data-bs-theme="dark"  className="carousel slide">
            <Carousel.Item>
                <img
                    className="d-block w-100 carrousel-img"
                    style={{ height: "100vh", objectFit: "cover" }}
                    src="/istdabbanner.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5></h5>
                    <p></p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carrousel-img"
                    style={{ height: "100vh", objectFit: "cover" }}
                    src="/et.webp"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5></h5>
                    <p></p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carrousel-img"
                    style={{ height: "100vh", objectFit: "cover" }}
                    src="/fp.webp"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5></h5>
                    <p>
                        
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );

}

export default CarrouselInit;