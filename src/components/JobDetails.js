import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loader from './Loader';

const JobDetails = () => {

    const { id } = useParams();
    let [test, setTest] = useState(null);
    const [loaderState, setLoaderState] = useState(true)

    


    useEffect(() => {


        axios.get(`http://127.0.0.1:8000/api/jobs/${id}`).then((response) => {
            setLoaderState(false)
            setTest(response.data);

        });


    }, [id])







    return (
        < div className="container jobs-content" >
             { loaderState ? <Loader /> : <div className="row">


                {/* {loaderState ? <Loader /> : null} */}
                <div className="col-12">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 job-company">
                                {test && test[0].recruiting_company}
                            </div>
                            <div className="col-12 job-title">
                                {test && test[0].title} | <code className="date-posted" >Posted {test && test[0].created_at}</code>
                            </div>
                            <div className="col-12 job-details">
                                {test && test[0].description}

                            </div>
                            <div className="col-12 readmore-button-section" >

                            </div>

                        </div>

                    </div> 
                </div> 

            </div>}

        </div>
    )
}

export default JobDetails