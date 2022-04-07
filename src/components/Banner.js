import React from "react";

const Banner = () => {



    return (


        <div className="container-fluid banner-image">
            <img className="img-fluid" src={process.env.PUBLIC_URL + "images/banner3.png"} ></img>

        </div>

    )
}

export default Banner