import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

const JobDetails = (props) => {

    const { id } = useParams()
    console.log(id)
    return (
        < div className="container jobs-content" >
            JobDetails<br></br>
            
        </div>
    )
}

export default JobDetails