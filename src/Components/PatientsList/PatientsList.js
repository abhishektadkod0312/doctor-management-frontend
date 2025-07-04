import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Search from '../SearchResult';
import { Link } from 'react-router-dom';
import SearchResultPatient from '../SearchResult/SearchResultPatient';

function PatientsList() {
    const [meds, setMeds] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const medRef = useRef(null)
    const getAllMedicines = () => {
        axios.get("http://localhost:8080/patients").then((res) => {
            setMeds(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const onsubmitInput = (event) => {
        event.preventDefault()
        const key = event.target.value
        if (key != '') {
            axios.get("http://localhost:8080/search/patient/" + key).then((res) => {
                if (res.data != []) {
                    setMeds(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            getAllMedicines()
        }
    }

    useEffect(() => {
        getAllMedicines()
    }, [])

    return (
        <div class="">
            <div>
               {/* {showMenu==true?<Navbar display={showMenu}/>:""} */}
                <div className="one">
                    <h4>PATIENTS</h4>
                    <div className="two">
                        <Link to="/addPatient"><i class="fa fa-plus-circle"></i></Link>&nbsp;&nbsp;
                        {/* <i class="fa fa-filter" aria-hidden="true"></i> */}
                    </div>
                </div>
                <i class="fa fa-search" aria-hidden="true">&nbsp;&nbsp;</i>
                <input class="search" type="search"
                    placeholder="Search..." ref={medRef} onInput={onsubmitInput} />
                <hr />
                <div class="p-3" className="three">

                    <div class="container">
                        {meds.map((e) =>
                            <SearchResultPatient e={e} />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsList