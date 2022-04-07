import React, { useState, useEffect } from "react";


const SearchBox = (props) => {

    const [searchKeyword, setSearchKeyword] = useState("")
    const searchFilter = props.searchFilter


    const handleSubmit = (e) => {
        e.preventDefault()
        searchFilter(searchKeyword)
    }

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
        //console.log(e.target.value);

    }

    return (


        <div className="container search-box">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-9 col-sm-10">
                        <input type="text" placeholder="Search for Job e.g Software Developer" className="search-input" onChange={handleChange} value={searchKeyword}></input>
                    </div>
                    <div className="col-3 col-sm-2">
                        <center><button type="submit" className="search-button"><i className="fas fa-search"></i></button></center>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default SearchBox