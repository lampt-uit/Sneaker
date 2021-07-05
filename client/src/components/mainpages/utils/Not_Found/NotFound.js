import React from 'react'
import {Link} from 'react-router-dom'
import "./NotFound.css"
function NotFound() {
    return (
        <div className='container__found'>
            <div className="content__found">
                <h2 className='found__title'>Oops! Page not found</h2>
                <h1 className='found__error'>404</h1>
                <p className="found__text">We can't find the page you're looking for</p>
                <Link to='/' className='found__link'>Go back home</Link>
            </div>
        </div>
    )
}

export default NotFound
