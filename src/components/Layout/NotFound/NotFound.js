import React, { Fragment } from 'react';

const NotFound = () => {
    return (
        <Fragment>
            <h1 className='text'>
                <i className='fas fa-exclamation-triangle' />        
            </h1>
            <p className='large'>Required page does not exist</p>
        </Fragment>
    )
}

export default NotFound;