import React from 'react'

function Finalize(props) {
  return (
    <div className='card p-3 m-3'>
    <i class="fas fa-times" style={{fontSize:'30px',color:'black'}} onClick={()=>props.deleteMedicineFinalized(props.ele)}></i>
         <div className='text-center'>Medicine:{props.ele.name}</div><br/>
         <div className='text-center'>Quantity:{props.ele.stock}</div><br/>
         <div className='text-center'>Money:{props.ele.money}</div><br/>
         
     </div>
  )
}

export default Finalize