// Dashboard.jsx

import React, { useEffect, useState } from "react";
import './App.css';
import { Button, Modal, notification, Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import EditIcon from "./Assets/edit icon.png";
import DeleteIcon from "./Assets/delete icon.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import FormList from "antd/es/form/FormList";

export function Dashboard() {
    const [arr, setArr] = useState([]);
    const [formName, setFormName] = useState('');
    const [noDataMessage, setNoDataMessage] = useState('No Forms Created Yet');
    const [ModalOpen, setModalOpen] = useState(false);
    const [EditModal, setEditModal] = useState(false);
    const [DeleteModal, setDeleteModal] = useState(false)
    const navigate = useNavigate();
    const [FormToEdit, setFormToEdit] = useState(null);
    const [IndexToEdit, setIndexToEdit] = useState(null);
    const [FormToDelete, setFormToDelete] = useState(null);
    const [IndexToDelete, setIndexToDelete] = useState(null);
    const dispatch = useDispatch()
    const FormDetails = useSelector((data)=>data)
    const [notificationShown, setNotificationShown] = useState(FormDetails.LoginNotification);
    let noData = FormDetails.formsList.length === 0;


    function signout() {
        navigate('/');
    }

    function openModal() {
        setModalOpen(true);
    }

    function FormNameSettup() {
        const newForm = {
            formId: Math.random(),
            formName: formName,
            created: new Date().toLocaleString(),
            updated: '',
            action: '',
            formBuilt:[]
        };
        setArr([...FormDetails.formsList, newForm]);
        dispatch(
            {
                type:'FORM_DATA',
                data: newForm
            }
        )
        setModalOpen(false);
        setFormName('');
    }

    function EditForm(form, index) {
        setFormToEdit(form);
        setIndexToEdit(index);
        setEditModal(true);
    }

    const sortArrayByDate = (array) => {
        return array.sort((a, b) => {
            const dateA = a.updated;
            const dateB = b.updated;

            if (dateA==="" && dateB==="") {
                return 0;
            }

            if (dateA==="") {
                return 1;
            }

            if (dateB==="") {
                return -1;
            }

            return new Date(dateB) - new Date(dateA);
        });
    };

    function UpdateForm() {
        const updation = FormDetails.formsList.map((e, index) => {
            if (index === IndexToEdit) {
                return { ...FormToEdit, updated: new Date().toLocaleString() };
            } else {
                return e;
            }
        });
        dispatch({
            type: 'UPDATE_FORM',
            updatedForms: sortArrayByDate(updation)
        });
        setEditModal(false);
    }

    function DeleteModalFunc(form, index){
        setDeleteModal(true)
        setFormToDelete(form)
        setIndexToDelete(index)
    }

    function DeleteForm(){
        // const deletion = arr.splice(IndexToDelete, 1);
        dispatch(
            {
                type: 'DELETE_FORM',
                index: IndexToDelete
            }
        )
        setDeleteModal(false);
        notification.open({
            message: 'Form deleted successfully',
            placement: 'bottomLeft',
            duration: 1,
            closeIcon: null,
            style: {
                backgroundColor:'#FF5C5C',
                borderRadius: '20px'
            }
        })
    }

    useEffect(() => {
        if (notificationShown===true) {
        notification.open({
            message: (
                <span style={{ color: "white", fontSize: "18px", fontWeight: "bolder" }}>Sign in Success</span>
            ),
            description: (
                <span style={{ color: "white", fontWeight: "bolder" }}>Welcome to the Dashboard!!!</span>
            ),
            duration: 3,
            placement: 'bottomLeft',
            icon: <SmileOutlined style={{ color: "white", fontSize: "30px" }} />,
            style: {
                backgroundColor: "#59981A",
                borderRadius: '20px'
            },
            closeIcon: null,
            onClose: () =>{
                dispatch(
                    {
                        type: 'NOTIFICATION_OFF',
                        data: false
                    }
                )
            }
        });
    }
    }, [notificationShown]);

    const handleLinkClick = (formName, formIdSelected) => {
        dispatch({
            type: 'SET_FORMS',
            selectedFormName: formName,
            selectedFormId: formIdSelected
        });
    };

    return (
        <>
            <div className="Dashboard-page">
                <div className="Dashboard-header">
                    <div className="Dashboard-header-heading">
                        <span className="Dashboard-header-name">Forms</span>
                        <span className="Dashboard-header-slogan">View, Edit, or Create a new form</span>
                    </div>
                    <div className="button-container">
                        <Button className="New-form-button" onClick={() => { openModal() }}>New Form</Button>
                        <Button className="Signout-button" onClick={() => { signout() }}>Sign out</Button>
                    </div>
                </div>
                <div className="Dashboard-body">
                    <div className="CustomTable">
                        <div className="TableRow-Header">
                            <div className="TableCell1">Form Name</div>
                            <div className="TableCell1">Created at</div>
                            <div className="TableCell1">Updated at</div>
                            <div className="TableCell1">Action</div>
                        </div>
                        {noData ? (
                            <div className="TableRow-body NoDataMessage">
                                <div>{noDataMessage}</div>
                            </div>
                        ) : (
                            // Sorting the array based on the 'created' and 'updated' fields in descending order
                            FormDetails.formsList.map((e, index) => (
                                <div key={index} className="TableRow-body">
                                    <div className="TableCell2"><Link to={`/formbuilder/${e.formName}`} className="FormName-Link" onClick={() => handleLinkClick(e.formName, e.formId)}>{e.formName}</Link></div>
                                    <div className="TableCell2">{e.created}</div>
                                    <div className="TableCell2">{e.updated}</div>
                                    <div className="TableCell2">
                                        <button className="EditBtn" onClick={() => { EditForm(e, index) }}><img className="EditBtnImg" src={EditIcon} alt="Edit" /></button>
                                        <button className="DeleteBtn" onClick={()=>{DeleteModalFunc(e,index)}}><img className="DeleteBtnImg" src={DeleteIcon} alt="Delete" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Modal title={<div style={{ color: "#603F8B" }}>Create a Form by giving a Name</div>} open={ModalOpen} onCancel={() => { setModalOpen(false) }} footer={null}>
                        <div className="Dashboard-Modal">
                            <div style={{ width: "80%" }}>
                                <label htmlFor="FormName" className="Modal-Label">Form Name</label>
                                <Input className="Modal-Input" placeholder="Name your Form" value={formName} onChange={(e) => { setFormName(e.currentTarget.value) }} />
                            </div>
                            <Button className="Modal-Button" onClick={() => { FormNameSettup() }}>Proceed</Button>
                        </div>
                    </Modal>

                    <Modal title={<div style={{ color: "#603F8B" }}>Edit Your Form Name</div>} open={EditModal} onCancel={() => { setEditModal(false) }} footer={null}>
                        <div className="Dashboard-Modal">
                            <div style={{ width: "80%" }}>
                                <label htmlFor="FormName" className="Modal-Label">Form Name</label>
                                <Input value={FormToEdit?.formName} className="Modal-Input" placeholder="Name your Form" onChange={(e) => { setFormToEdit({ ...FormToEdit, formName: e.currentTarget.value }) }} />
                            </div>
                            <Button className="Modal-Button" onClick={() => { UpdateForm() }}>Change</Button>
                        </div>
                    </Modal>

                    <Modal open={DeleteModal} footer={null} onCancel={()=>{setDeleteModal(false)}}>
                        <h1 style={{color:"red"}}>Delete Form</h1>
                        <h3>Are you sure ? </h3>
                        <h3>You are Attempting to delete the form <span style={{color:"Red"}}>{`"${FormToDelete?.formName}"`}</span></h3>
                        <h3>this action is irreversible</h3>
                        <Button style={{width:"100%", backgroundColor:"red", color:"white", fontSize:"16px", height:"40px"}} onClick={()=>{DeleteForm()}}>Yes, I'm Sure!</Button>
                    </Modal>
                </div>
            </div>
        </>
    );
}
