import React, { useState, useEffect } from 'react';
import './style.css';
import { Input, Button,Card } from 'reactstrap';
import ListItem from '../ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'

const TodoList = (props) => {

     const [userData, setUserData]= useState(null);
     const [task, setTask]= useState('');

     const getUserData=()=>{
      fetch('http://localhost:8080/task/',{credentials: "include"})
     .then(resp=> resp.ok? resp.json() : false)
     .then(data=>{
         if(data){
            debugger;
            data.sort((a, b) => new Date(a['updatedAt']) > new Date(b['updatedAt']));
            //const tasks = data.map(val => val.description)
            setUserData(data);
         }
     })
     .catch(err=> console.error(err));
    }

    const addTask=()=>{
      fetch('http://localhost:8080/task/add', {
         method:"POST",
         body: JSON.stringify({description:task}),
         headers: {
            "content-type": "application/json"
         },
         credentials: "include"
      }).then((response)=>{
         if(response.ok)
         {
            return response.json();
         }else{
            return false;
         }
      }).then((success)=>{
         if(success)
         {
            const data=userData;
            data.push(success['success']);
            debugger;
            setUserData([...data]);
            setTask('');
         }
      })
      .catch(err=>console.error(err));
    };

    const deleteHandler=(id)=>{
         userData.splice(id,1);
         setUserData([...userData]);
    }

    const editHandler=()=>{
       getUserData();
    }


     useEffect(()=>{
      getUserData();
    },[]);


   return <div>
      
      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,256L480,320L960,96L1440,256L1440,0L960,0L480,0L0,0Z"></path></svg>
      
      <div className="todoList">
         <div className="logout"><FontAwesomeIcon icon={faUserMinus}  onClick={()=>props.logoutHandler()} />{props.userInfo?props.userInfo.split(" ")[0]:null}</div>
         <Input type="text" className="taskInputArea mr-3" value={task} onChange={(event)=>setTask(event.target.value)}></Input>
         <Button outline color="warning" className="addTask" onClick={addTask} disabled={task?task.trim()?false:true:true}>ADD</Button>
         <Card className="listData">
            {userData?userData.map((value,idx)=>{
               return <ListItem taskValue={value.description} key={`_${idx}_`} id={idx} objId={value._id} deleteHandler={deleteHandler} editHandler={editHandler} />
            }): null}
         </Card>
      </div>
   </div>
}

export default TodoList;