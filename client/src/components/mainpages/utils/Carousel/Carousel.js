import React from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'
function Carousel({image,title, price}) {
    return (
        <>
           <div className="carousel">
                <Link to='/#' className="wrapper">
                    <img src={image} alt="" />
                    <div className="wrapper-title">
                        <h3>{title}</h3>
                        <p>{price}</p>
                    </div>
                    
                </Link>
           </div>

        </>
    )
}

export default Carousel
