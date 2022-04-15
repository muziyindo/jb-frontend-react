import React, { useState, useEffect } from "react"
import SearchBox from './SearchBox'
import PaginatedItems from './PaginatedItems'
import Loader from "./Loader";

const Jobs = () => {

  const [jobs, setJobs] = useState([])
  const [loaderState, setLoaderState] = useState(true)
  let [temp, setTemp] = useState([]);


  // Fetch Jobs
  const fetchJobs = async () => {
    const response = await fetch('https://godicham.com/dmmsolutionjobs-backend/api/jobs')
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
    //setInterval(() => {

      const getJobs = async () => {
        const jobsFromServer = await fetchJobs()
        setLoaderState(false)
        setTemp(jobsFromServer);
        setJobs(jobsFromServer);
        //console.log(temp);
      }
      getJobs()

    //}, 1000)


  }, [])

  const searchFilter = async (searchKeyword) => {
    //clearInterval(intervalID);
    const filteredJobs = temp.filter(item => {

      return (item.title).toLowerCase().match(searchKeyword.toLowerCase());

    })

    setJobs(filteredJobs)

    if (!searchKeyword) {
      setLoaderState(true)
      const refreshedJobsFromServer = await fetchJobs();
      setLoaderState(false)
      setTemp(refreshedJobsFromServer);
      setJobs(refreshedJobsFromServer);
    }

  }
  
  return (
    <div>
      <SearchBox searchFilter={searchFilter}></SearchBox>
        {loaderState ? <Loader /> : <PaginatedItems itemsPerPage={4} items = {jobs} /> }
    </div>
  )
}

export default Jobs