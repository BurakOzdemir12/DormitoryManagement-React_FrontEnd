import React, { useState } from 'react'
import { Button, Input } from 'reactstrap'
import axios from "axios";
export default function Test() {

  const [inputs,setInputs]=useState({})

  const handleChange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setInputs(values => ({...values,[name]: value}));
  }
  const handleSubmit=(event)=>{
event.preventDefault();
axios.post('http://localhost:8888/api/user/save',inputs);
console.log(inputs);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <label>mail</label>
       <Input type='text' name='mail' onChange={handleChange}></Input>
       <br/>
       <label>Student Number</label>
       <Input type='text' name='studentNumber' onChange={handleChange}></Input>
       <br/>
       <label>Name</label>
       <Input type='text' name='name' onChange={handleChange}></Input>
       <br/>
       <label>Last Name</label>
       <Input type='text' name='lastname' onChange={handleChange}></Input>
       <br/>
       <Button>Submit</Button>
      </form>
    </div>
  )
}
