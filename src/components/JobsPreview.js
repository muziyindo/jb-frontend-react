import React from 'react'

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
                                {item.title} | <code className="date-posted" >Posted {item.created_at}</code>
                                </div>
                                <div className="col-12 job-details">
                                {(item.description).substring(0,150)}

                                </div>
                                <div className="col-12 readmore-button-section" >
                                    <button type="submit" className="btn btn-primary btn-md read-more-button"><i
                                        className="fas fa-eye"></i></button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >

    )
}

export default JobsPreview