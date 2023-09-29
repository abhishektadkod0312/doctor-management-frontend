import React from 'react'
import './addForm.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

function AddForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post("http://localhost:8080/medicine",data).then((res)=>{
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
                            <Link to="/">
                                <i class="fa fa-chevron-circle-left" aria-hidden="true" data-bs-toggle="modal"
                                    data-bs-target="#myModal"></i>
                            </Link>
                        </div>
                    <div className='display-4'>Add Medicine</div>
                    </div>

                    <br /><br></br>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Medicine Name"
                                 {...register("name")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Company</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Company where this was bought" 
                                 {...register("company")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Stock</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Stock bought" 
                                 {...register("stock")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Stock Limit</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control form-control-lg" id="colFormLabelLg" placeholder="To raise an alert if it drops below a certain value" 
                                 {...register("stockLimit")}/>
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Cost</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Amount Raised" 
                                 {...register("money")}/>
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

export default AddForm