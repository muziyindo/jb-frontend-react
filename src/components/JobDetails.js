import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import Parser from 'html-react-parser'

const JobDetails = () => {

    const { id } = useParams();
    let [test, setTest] = useState(null);
    const [loaderState, setLoaderState] = useState(true)

    


    useEffect(() => {


        axios.get(`http://localhost:8000/api/jobs/${id}`).then((response) => {
        //axios.get(`https://godicham.com/dmmsolutionjobs-backend/api/jobs/${id}`).then((response) => {
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
                                {test && test[0].title} | <code className="date-posted" >Posted {test && test[0].created_at}</code> | <span className="date-posted text-danger">Location is {test && test[0].location} </span>
                            </div>
                            <div className="col-12 job-details">
                                { Parser( ""+(test && test[0].description)+"" ) }

                            </div>
                            <div className="col-12" >
                            <br/>
                            <h3 class="job-title">Application Method | <span className="job-company">{ test && test[0].application_method === "Email" ?  "Email" : "Website" } </span></h3>
                            { Parser(test && test[0].application_method === "Email" ? "Send your CV and Cover letter to <b>"+( test && test[0].email_website)+"</b>" : "<a href="+(test && test[0].email_website)+">Click here to apply</a>") }

                            </div>

                        </div>

                    </div> 
                </div> 

            </div>}

        </div>
    )
}

export default JobDetails