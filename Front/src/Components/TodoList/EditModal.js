
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const EditModal = (props) => {

  const [modal, setModal] = useState(true);
  const [editValue, setEditValue]= useState(props.taskvalue);

  const toggle = () => {
      setModal(!modal);
      props.setEditTask(false);
  }

 const updateTask=()=>{
    fetch(`http://localhost:8080/task/update/${props.objId}`, {
        method: "PUT",
        body: JSON.stringify({description:editValue}),
        headers: {
           "content-type": "application/json"
        },
        credentials: "include"
    }).then((response) => {
        if (response.ok) {
            toggle();
            props.editHandler();
           
        }
    })
        .catch(err => console.error(err));
 }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
         <Input value={editValue} onChange={(event)=> setEditValue(event.target.value)}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={updateTask} disabled={editValue?editValue.trim()?false:true:true}>Edit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditModal;