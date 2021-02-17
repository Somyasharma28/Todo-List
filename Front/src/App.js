import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import TodoList from './Components/TodoList';
import { Switch, Route, useHistory } from "react-router-dom";
import React,{ useState,useEffect } from 'react';


export default function App() {

  const history= useHistory();
  const [userInfo, setUserInfo] = useState(null);

  const logoutHandler=()=>{
    fetch('http://localhost:8080/logout',{credentials: "include"})
    .then(resp=> resp.ok? true : false)
    .then(data=>{
        if(data){
          setUserInfo(null);
          history.push("/");
        }
    })
    .catch(err=> console.error(err));
  }

  const getdata=()=>{
    fetch('http://localhost:8080/userInfo',{credentials: "include"})
   .then(resp=> resp.ok? resp.json() : false)
   .then(data=>{
       if(data){
         setUserInfo(data.username);
         history.push("/todolist");
       }
   })
   .catch(err=> console.error(err));
  }

  useEffect(()=>{
    getdata();
  },[]);

   
  return (
    <div className="App">
      <Switch>
        <Route exact path="/todolist">
          <TodoList userInfo={userInfo} logoutHandler={logoutHandler}  />
        </Route >
        <Route exact path="/Signup">
          <Signup showTodo={getdata} />
        </Route>
        <Route exact path="/" >
          <Login showTodo={getdata} />
        </Route>
      </Switch>
    </div>
  );
}

