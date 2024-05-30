import React from 'react';

const Description = (props) => {
    return(
        <React.Fragment>
            <blockquote>
                {props.description}
            </blockquote>
        </React.Fragment>
    );
}

export default Description;