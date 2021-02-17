import React, { useState } from 'react';
import Header from '../Header';
import './style.css';
import { Card, CardBody, Form, FormGroup, Input, Label, Button,FormText } from 'reactstrap';

const Signup = (props) => {
    const [details, setDetails] = useState({username: "",email: "", password: "", confirmPassword: ""});
    const [error,setError]= useState(null);
 

    const signupHandler=(event)=>{
        event.preventDefault();

        fetch('http://localhost:8080/register', {
            method: "Post",
            body: JSON.stringify(details),
            headers:{
                "content-type" : "application/json"
            },
            credentials: "include"
        }).then((response)=>{
            return response.ok? {success:true}: response.json();
        }).then((resp)=> {
              if(resp.success)
               props.showTodo() 
               else {
                   setError(resp.err); 
                   setDetails({username: "",email: "", password: "", confirmPassword: ""});
               }           
       }).catch(err=> setError("Error Occurred"));
    }

    return (<React.Fragment>
        <Header />
        <div className="mainSignUp">
            <Card >
                <CardBody>
                    <div className="error">
                        {error}
                        </div>
                    <Form onSubmit={signupHandler} method="POST">
                        <FormText><h4>Sign Up</h4></FormText>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" placeholder="Enter your username" onChange={(e)=>setDetails({...details, username: e.target.value})} value={details.username} required  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" onChange={(e)=>setDetails({...details, email: e.target.value})} value={details.email} required  />
                        </FormGroup>
                        <FormGroup>
                            <Label >Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" onChange={(e)=>setDetails({...details, password: e.target.value})} value={details.password} required />
                            <Input type="password" id="confirmPassword" placeholder="Confirm password" onChange={(e)=>setDetails({...details, confirmPassword: e.target.value})} value={details.confirmPassword} required  />
                        </FormGroup>
                        <Button type="Submit" color="info">Register</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    </React.Fragment>);
}

export default Signup;