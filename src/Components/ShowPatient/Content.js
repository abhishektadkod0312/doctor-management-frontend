import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from '../SearchResult';
import Session from './Session';
import Finalize from './Finalize';

function Content(props) {

  const [meds, setMeds] = useState([])
  const [one, setOne] = useState('col-md-4')
  const [two, setTwo] = useState('col-md-4')
  const [three, setThree] = useState('col-md-0')
  const [medsBought, setMedsBought] = useState(new Set())
  const [medsFinalize, setMedsFinalized] = useState(new Set())
  const [medsConfirm, setMedsConfirm] = useState([])
  const [history, setHistory] = useState(null)
  const medRef = useRef(null)

  const getAllMedicines = () => {
    axios.get("http://192.168.29.184:8080/medicines").then((res) => {
      setMeds(res.data)
    })
  }

  const onsubmitInput = (event) => {
    event.preventDefault()
    const key = event.target.value
    if (key != '') {
      axios.get("http://192.168.29.184:8080/search/medicine/" + key).then((res) => {
        if (res.data != []) {
          setMeds(res.data)
        }
      })
    }
    else {
      getAllMedicines()
    }
  }

  const addMedsBought = (e) => {
    let b = new Set([...medsBought])
    b.add(e);
    setMedsBought(b)
  }

  const addMedsFinalize = (e) => {
    let b = new Set([...medsFinalize])
    b.add(e);
    setMedsFinalized(b)
  }

  const deleteMedicine = (e) => {
    let b = new Set([...medsBought])
    b.delete(e)
    setMedsBought(b)
  }

  const deleteMedicineFinalized = (e) => {
    let b = new Set([...medsFinalize])
    b.delete(e)
    setMedsFinalized(b)
  }

  const addSession = () => {
    const a = {
      "patient": props.e.id,
      "medicinesRequests": medsConfirm
    }

    console.log(a)
    axios.post('http://192.168.29.184:8080/session', a).then((res) => {
        alert("Succesful Transaction")
        getSessions()
  
    })
   
  }

  const getSessions = () =>{
    axios.get('http://192.168.29.184:8080/sessions').then((res) => {
      if(res.status==200){
        setHistory(res.data)
      }
    })
  }



  useEffect(() => {
    getAllMedicines()
    getSessions()
  }, [])

  useEffect(() => {
    console.log(history)
  }, [history])
  

  useEffect(() => {
    medsFinalize.forEach(e => {
      setMedsConfirm([...medsConfirm, { id: e.id, name: e.name }])
    })
  }, [medsFinalize]
  )
  return (
    <>
      <div className='container mt-5'>
        <div className='back'>
          <Link to="/patientsList">
            <i class="fa fa-chevron-circle-left" aria-hidden="true" ></i>
          </Link>
        </div><br />
        {props.e.name}
        <br />
        <div class="container">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a></li>&nbsp;&nbsp;
            &nbsp;    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#menu1">History</a></li>
          </ul>

          <div class="tab-content">
            <div id="home" class="container tab-pane active">
             <div className="row" style={{ textAlign: 'start' }}>
                <hr /><br />
                <div className='col-md-2' style={{ marginRight: 'auto', transition: "2s ease-in" }}>
                  <input class="search" type="search"
                    placeholder="Search..." ref={medRef} onInput={onsubmitInput} /><br />
                  {meds.map((e) =>
                    <><br /><div className='btn btn-outline-dark' style={{ left: '0' }} onClick={() => addMedsBought(e)}>{e.name}</div><br /></>
                  )
                  }
                </div>
                <div className='col-md-2' style={{ borderLeft: "1px solid black", "height": "70vh" }}></div>
                <div className='col-md-2' style={{ marginRight: 'auto', transition: "2s ease-in" }}>
                  {[...medsBought].map((e) => <Session addMedsFinalize={addMedsFinalize} ele={e} deleteMedicine={deleteMedicine} />)}
                </div>
                <div className='col-md-2' style={{ borderLeft: "1px solid black", "height": "70vh" }}></div>

                <div className='col-md-2' style={{ marginRight: 'auto', transition: "2s ease-in" }}>
                  {[...medsFinalize].map((e) => <Finalize deleteMedicineFinalized={deleteMedicineFinalized} ele={e} deleteMedicine={deleteMedicine} />)}
                  <div className='btn btn-outline-success text-center' onClick={addSession}>Confirm</div>
                </div>

              </div>
            </div>
            <div id="menu1" class="container tab-pane fade">
              <h3>History</h3>
                {history!=null && history!=[]?history.map((e)=>e.id):"Sorry No Data"}
            </div>
          </div>
        </div>



      </div>
    </>
  )
}

export default Content