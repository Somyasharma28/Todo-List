import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditModal from '../TodoList/EditModal';


const TodoList = (props) => {

    const [editTask, setEditTask] = useState(false);

    const deleteTask = () => {
        fetch(`http://localhost:8080/task/delete/${props.objId}`, {
            method: "DELETE",
            credentials: "include"
        }).then((response) => {
            if (response.ok) {
                props.deleteHandler(props.id);
            }
        })
            .catch(err => console.error(err));
    }


    return <>
        {editTask
            ?
            <EditModal showModal={true} taskvalue={props.taskValue} objId={props.objId} editHandler={props.editHandler} setEditTask={setEditTask} />
            :
            <div className="listItem">
                {props.taskValue}
                <span className="editDelete m-2">
                    <FontAwesomeIcon icon={faPencilAlt} className="edit mr-1" size={'xs'} onClick={()=>setEditTask(true)} />
                    <FontAwesomeIcon icon={faTrashAlt} className="delete mr-1" size={'xs'} onClick={deleteTask} />
                </span>
            </div>}
    </>
}

export default TodoList;