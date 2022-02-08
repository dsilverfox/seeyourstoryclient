import React from "react";
import { Carousel } from "react-bootstrap";

const ExampleDisplay = () => {
    return (
        <Carousel variant="dark">
            <Carousel.Item interval={10000}>
                <img
                    className="d-block w-100"
                    src="https://dsilverfox.github.io/Assets/SilverfoxWQuill%20(2).jpg"
                    alt="First slide"
                    height="710px"
                />
                <Carousel.Caption className="caption">
                    <p>My company logo.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <img
                    className="d-block w-100"
                    src="https://dsilverfox.github.io/Assets/Build%20in%20Progress.PNG"
                    alt="Second slide"
                    height="710px"
                />

                <Carousel.Caption className="caption">
                    <p>Beginning of Tutorial.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <img
                    className="d-block w-100"
                    src="https://dsilverfox.github.io/Assets/Build%20in%20Progress.PNG"
                    alt="Third slide"
                    height="710px"
                />

                <Carousel.Caption className="caption">
                    <p>After many tutorial pages this is the What's Next?.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
export default ExampleDisplay;