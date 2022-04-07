import React, { useState, useEffect } from "react"
import './App.css';
import SearchBox from "./components/SearchBox";
import Banner from "./components/Banner";
import JobsPreview from "./components/JobsPreview";
import Loader from "./components/Loader";

function App() {


  const [jobs, setJobs] = useState([])
  const [loaderState, setLoaderState] = useState(true)
  let [temp,setTemp] = useState([]);
  

  // Fetch Jobs
  const fetchJobs = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/jobs')
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {

    const getJobs = async () => {
      const jobsFromServer = await fetchJobs()
      setLoaderState(false)
      setTemp(jobsFromServer);
      setJobs(jobsFromServer);
      //console.log(temp);
    }
    getJobs()

    }, 1000)
    
    return () => clearInterval(intervalID);

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
    <div className="App">

      {/* Navigation Bar start */}
      <div className="container-fluid parent-container">
        <div className="container-fluid top-bar"></div>

        <div className="container-fluid nav-container">
          <div className="row custom-nav">
            <div className="col-sm-4 col-md-8 our-logo">
              JOBBOARD
            </div>
            <div className="col-sm-2 col-md-1 nav-item_"><i className="fas fa-home"></i> Home</div>
            <div className="col-sm-2 col-md-1 nav-item_"><i className="fas fa-user-circle"></i> Jobs</div>
            <div className="col-sm-2 col-md-1 nav-item_"><i className="fas fa-info-circle"></i> About</div>
            <div className="col-sm-2 col-md-1 nav-item_"><i className="fas fa-phone"></i> Contact</div>
          </div>

          <nav className="navbar navbar-expand-lg navbar-dark b-nav">
            <a className="navbar-brand our-logo" href="#">JOBBOARD</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">

                <li className="nav-item active">
                  <a className="nav-link" href="#"><i className="fas fa-home"></i> Home <span
                    className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="fas fa-user-circle"></i> Jobs <span
                    className="sr-only"></span></a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="fas fa-info-circle"></i> About <span
                    className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="{{ route('register-user') }}"><i className="fas fa-user-circle"></i>
                    Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* Navigation Bar end */}

      <Banner></Banner>


      <SearchBox searchFilter={searchFilter}></SearchBox>

      {loaderState ? <Loader /> : jobs.map(JobsPreview)}

    </div>
  );
}

export default App;
