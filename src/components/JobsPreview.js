import React from 'react'
import { Link } from 'react-router-dom'
import Parser from 'html-react-parser'

const JobsPreview = (item) => {
    
    return (

        < div className="container jobs-content" key={item.id}>
                <div className="row">

                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 job-company">
                                    {item.recruiting_company}
                                </div>
                                <div className="col-12 job-title">
                                {item.title} | <scan className="date-posted text-secondary" >Posted {item.created_at}</scan> | <scan className="date-posted text-danger" >Location is { item.location }</scan>
                                </div>
                                <div className="col-12 job-details">
                                {Parser((item.description).substring(0,300)+"...")}

                                </div>
                                <div className="col-12 readmore-button-section" >
                                <Link to={`/jobdetails/${item.id}`} ><button type="button" className="btn btn-primary btn-md read-more-button"><i
                                        className="fas fa-eye"></i></button></Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >

    )
}

export default JobsPreview