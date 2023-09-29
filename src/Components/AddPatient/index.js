import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

function AddPatient() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post("http://localhost:8080/patient",data).then((res)=>{
            if(res.status==200){
                alert("Successfully Added")
            }
        })
    }

    return (
        <div className='container p-5 '>
            <div className='center'>
                <div className='card m-5 p-5 text-light' style={{ backgroundColor: "#078564" }}>
                    <div style={{ display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div className='back'>
                            <Link to="/patientsList">-
                                <i class="fa fa-chevron-circle-left" aria-hidden="true" data-bs-toggle="modal"
                                    data-bs-target="#myModal"></i>
                            </Link>
                        </div>
                    <div className='display-4'>Add Medicine</div>
                    </div>

                    <br /><br></br>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Patient Number</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Patient Number"
                                 {...register("patientNumber")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Name" 
                                 {...register("name")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Contact</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Phone Number" 
                                 {...register("phone")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Address</label>
                            <div class="col-sm-10">
                                <textarea type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Address" 
                                 {...register("address")}/>
                            </div>
                        </div>
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br /><br />
                        <button type='submit' className='btn btn-dark'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPatient