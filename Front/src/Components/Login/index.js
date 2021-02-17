import React, { useState } from 'react';
import Header from '../Header';
import './style.css';
import { Card, CardBody, Form, FormGroup, Input, Label, Button,FormText } from 'reactstrap';


const Login=(props)=>{
   const [details, setDetails] = useState({email: "", password: ""});
   const [error,setError]= useState(null);
   

    const loginHandler=(event)=>{
      event.preventDefault();

        fetch('http://localhost:8080/login', {
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
               props.showTodo();
              else{
               setError(resp.err);
               setDetails({email: "", password: ""});
              }
                            
       }).catch(err=> setError("Error Occurred"));
    }

    return (<React.Fragment>
        <Header />
        <div className="mainLogin">
            <Card >
                <CardBody>
                    <div className="error">
                        {error}
                     </div>
                    <Form onSubmit={loginHandler} method="POST" >
                    <FormText><h5>Login</h5></FormText>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" onChange={(e)=>setDetails({...details, email: e.target.value})} value={details.email} required  />
                        </FormGroup>
                        <FormGroup>
                            <Label >Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" onChange={(e)=>setDetails({...details, password: e.target.value})} value={details.password} required />
                        </FormGroup>
                        <Button type="Submit" color="info">Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    </React.Fragment>);
}

export default Login;