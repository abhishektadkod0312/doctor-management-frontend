import moment from 'moment'
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Search(props) {
    const dispatch = useDispatch();
    return (
        <div className='container-fluid searchEle'>
            <Link to="/medDetails" style={{textDecoration:'none',color:'black'}}>
                <div class="shadow-lg p-3 m-3 bg-white rounded five"
                 onClick={()=>{
                    dispatch({
                        type: "addIt",
                        val: props.e
                      })
                 }}>

                    <div class="icon-container col-md-1">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="col-md-5">
                        <b>{props.e.name}</b><br />
                        Stock: {props.e.stock}
                    </div>
                    <div class="text-center col-md-3">{moment(props.e.createdAt).format('MM/DD/YYYY')}</div>
                    <div class="text-center col-md-3"><i class="fa fa-chevron-circle-right"
                        aria-hidden="true"></i></div>
                </div>
            </Link>
        </div>
    )
}

export default Search