import React, { useState, useEffect } from "react"
import { Route, Link } from "react-router-dom"
import './App.css';
import SearchBox from "./components/SearchBox";
import Banner from "./components/Banner";
import JobsPreview from "./components/JobsPreview";
import Loader from "./components/Loader";
import About from "./components/About"
import Jobs from "./components/Jobs"
import Contact from "./components/Contact"
import JobDetails from "./components/JobDetails";

function App() {


  const [jobs, setJobs] = useState([])
  const [loaderState, setLoaderState] = useState(true)
  let [temp, setTemp] = useState([]);


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
    <div className="App">

      {/* Navigation Bar start */}
      <div className="container-fluid parent-container">
        <div className="container-fluid top-bar"></div>

        <div className="container-fluid nav-container">
          <div className="row custom-nav">
            <div className="col-sm-4 col-md-8 our-logo">
            <img className="img-fluid_" width="105" height="40" src={process.env.PUBLIC_URL + "images/aijobs.png"} alt="logo"></img>
            </div>
            <div className="col-sm-2 col-md-1 nav-item_"><Link to="/"><i className="fas fa-home"></i> Home</Link></div>
            <div className="col-sm-2 col-md-1 nav-item_"><Link to="/jobs"><i className="fas fa-user-circle"></i> Jobs</Link></div>
            <div className="col-sm-2 col-md-1 nav-item_"><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></div>
            <div className="col-sm-2 col-md-1 nav-item_"><Link to="/contact"><i className="fas fa-phone"></i> Contact</Link></div>
          </div>

          <nav className="navbar navbar-expand-lg navbar-dark b-nav">
            <Link to="/" className="navbar-brand our-logo">JOBBOARD</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">

                <li className="nav-item active">
                <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home <span
                    className="sr-only">(current)</span></Link>
                </li>

                <li className="nav-item">
                <Link to="/jobs" className="nav-link"><i className="fas fa-user-circle"></i> Jobs <span
                    className="sr-only"></span></Link>
                </li>

                <li className="nav-item">
                <Link to="/about" className="nav-link"><i className="fas fa-info-circle"></i> About <span
                    className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                <Link to="/contact" className="nav-link"><i className="fas fa-user-circle"></i>
                    Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* Navigation Bar end */}

      <Route exact path="/">
        <Banner></Banner>
        <SearchBox searchFilter={searchFilter}></SearchBox>
        {loaderState ? <Loader /> : jobs.map(JobsPreview)}
      </Route>

      <Route path="/about"  >
        <About />
      </Route>

      <Route path="/jobs"  >
        <Jobs />
      </Route>

      <Route path="/contact"  >
        <Contact />
      </Route>

      <Route path="/jobdetails/:id"  >
        <JobDetails />
      </Route>

    </div>
  );
}

export default App;
