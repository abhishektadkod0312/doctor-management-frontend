import React, { useEffect, useState } from 'react'
import "../index.css"

function Navbar(props) {

  return (
    <div style={{position:"absolute", background:"black", height:"100vh",width:"25vh",transition:"2s ease-in",top:"0",padding:"20px", zIndex:"0", display:props.display?"block":"none", fontSize:"25px"}}>
         <nav id="sidebarMenu" class="col-md-1 col-lg-1 d-md-block sidebar text-center p-4 mt-5">
				<div class="position-sticky pt-3">
					<ul class="nav flex-column">
					
						<li class="nav-item">
							<a class="nav-link" href="#">
								<div class="icon-container">
									<i class="fas fa-heartbeat"></i>
								</div>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								<div class="icon-container">
									<i class="fas fa-user-plus"></i>
								</div>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								<div class="icon-container">
									<i class="fas fa-medkit"></i>
								</div>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								<div class="icon-container">
									<i class="fas fa-user"></i>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</nav>
    </div>
  )
}

export default Navbar