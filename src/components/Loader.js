import React from 'react'

const Loader = () => {

    const styling = {
        "marginTop":"30px",
        
    }
    return (
        
            <center>
                <img className="img-fluid" src={process.env.PUBLIC_URL + "/images/loader.gif"} style={styling} alt="Loader"></img>
            </center>
        
    )
}

export default Loader