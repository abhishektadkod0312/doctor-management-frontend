import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Content(props) {
  console.log(props.e)
  const counter = useSelector(state => state.add);
  const dispatch = useDispatch();
  const [count, setCount] = useState(props.e.stock)
  const [isIncrease, setIsIncrease] = useState(false)
  const myRef = useRef(null)

  const addStock = () => {
    var v = window.confirm("Stock Current value:" + count + "?")
    if (v) {
      if (count > props.e.stock) {
        axios.post("http://192.168.29.184:8080/meds/increase", { id: props.e.id, quantity: count - props.e.stock }).then((res) => {
          if (res.status == 200)
            alert("Successfully Added")
        })
      }
      if (count < props.e.stock) {
        axios.post("http://192.168.29.184:8080/meds/decrease", { id: props.e.id, quantity: props.e.stock - count }).then((res) => {
          if (res.status == 200)
            alert("Successfully Added")
        })
      }

    }
  }

  useEffect(() => {
    if (props.e.stock != count) {
      setIsIncrease(true)
    }
    else {
      setIsIncrease(false)
    }
  }, [count])


  return (
    <div className='container mt-5'>
      <div className='back'>
        <Link to="/">
          <i class="fa fa-chevron-circle-left" aria-hidden="true" ></i>
        </Link>
      </div><br />
      <figure class="movie">

        <div class="movie__hero text-center ">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7pLeeX0QReL-OwCKl9c8VpoagAGZbFXn6hRN5bXMk2Q&s" alt="Med" class="movie__img" />
        </div>
        <div class="movie__content">
          <div class="movie__title">
            <h1 class="heading__primary">{props.e.name}</h1>
            <div class="movie__tag movie__tag--1">#digestive</div>
            <div class="movie__tag movie__tag--2">#psycosomatic</div>
          </div>
          <p class="movie__description">
            Med Description
          </p>
          {props.e.money ? <p class="h-5"><span class="icons icons-yellow"><i class="fas fa-file-invoice-dollar"></i>
            </span>&#8377;{props.e.money}</p> : ""}
          <div class="movie__details">
            <div className='btn btn-outline-primary'>
              Company:  {props.e.company}
            </div>
            <br />
            <span className='h4'>Stock:</span> <br />
            <span className='btn btn-dark' onClick={() => setCount(prev => prev - 1)}>-</span> &nbsp;
            <div className='btn btn-outline-primary'>
              {count}
            </div>&nbsp;
            <span className='btn btn-dark' onClick={() => setCount(prev => prev + 1)}>+</span>
            
            <div className='h4'>
              <br />or<br />
              +&nbsp;<input type='number' ref={myRef} />&nbsp;<span className='btn btn-outline-success' onClick={() => setCount(prev => prev + parseInt(myRef.current.value))}>Add</span>
            </div>


            {isIncrease ? <><br /><span className='btn btn-outline-dark' onClick={addStock}>Confirm</span></> : ""}
          </div>
        </div>
      </figure>
    </div>
  )
}

export default Content