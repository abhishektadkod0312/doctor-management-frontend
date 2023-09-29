import React, { useEffect, useState } from 'react'
import Content from './Content'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function ShowMeds() {
  const counter = useSelector(state => state.storeMed);
  const dispatch = useDispatch();
  return (
    <div>
        <Content e={counter.val}/>
    </div>
  )
}

export default ShowMeds