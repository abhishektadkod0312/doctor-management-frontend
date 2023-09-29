import React from 'react'

function Session(props) {
  const finalize = () =>{
    props.addMedsFinalize(props.ele)
  }

  return (
    <div className='card p-3 m-3'>
   <i class="fas fa-times" style={{fontSize:'30px',color:'black'}} onClick={()=>props.deleteMedicine(props.ele)}></i>
        <div className='text-center'>Medicine:{props.ele.name}</div><br/>
        <input type='text'/><br/>
        <div className='btn btn-outline-dark' onClick={finalize}>Add</div><br/>
    </div>
  )
}

export default Session