// FormBuilder.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DraggableComponent } from './DraggableComponent';
import { DroppableComponent } from './DroppableComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { UpdateComponents } from './UpdateComponents';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import  SaveIcon  from "./Assets/save icon.png"

const FormBuilder = () => {
  const FormToShow = useSelector((data)=>data)
  
  const dispatch = useDispatch()
  const [dropped, setDropped] = useState([]);
  
  const navigate = useNavigate()
  

  useEffect(()=>{
    // const setSelectedForm = 
    FormToShow.formsList.map((e)=>{
      if(FormToShow.SelectedFormId===e.formId){
        // return e.formBuilt
        setDropped(e.formBuilt)
      }
    })
  },[FormToShow.formsList.formBuilt])

  // useEffect(()=>{
  //   setDropped(FormToShow.componentsDropped)
  // },[])

  const compo = [
    {
      id: Math.random(),
      type: 'input-text',
      ideal: 'text',
      name: 'Text',
      label: 'Text',
      placeholder: 'text'
    },
    {
      id: Math.random(),
      type: 'input-number',
      ideal: 'number',
      name: 'Number',
      label: 'Number',
      placeholder: 'number',
      minimumValue: '',
      maximumValue: ''
    },
    {
      id: Math.random(),
      type: 'input-date',
      ideal: 'date',
      name: 'date',
      label: 'Date',
      placeholder:"Select date"
    },
    {
      id: Math.random(),
      type: 'input-time',
      ideal: 'time',
      name: 'Time',
      label: 'Time',
      placeholder: 'Select time'
    },
    {
      id: Math.random(),
      type: 'input-dateAndTime',
      ideal: 'datetime-local',
      name: 'Date and Time',
      label: 'Date and Time',
      placeholder: 'Select Date and Time'
    },
    {
      id: Math.random(),
      type: 'input-tel',
      ideal: 'tel',
      name: 'Phone or Mobile',
      label: 'Mobile or Phone',
      placeholder: 'Name'
    },
    {
      id: Math.random(),
      type: 'input-url',
      ideal: 'url',
      name: 'Url or website',
      label: 'Url or Website',
      placeholder: 'https://example.com'
    },
    {
      id: Math.random(),
      type: 'input-radio',
      ideal: 'radio',
      name: 'Radio Buttons',
      label: 'Radio Buttons',
      options: ["Option1", "Option2"]
    },
    {
      id: Math.random(),
      type: 'input-checkbox',
      ideal: 'checkbox',
      name: 'Checkboxes',
      label: 'Checkboxes',
      options: ["Option1", "Option2"]
    },
    {
      id: Math.random(),
      type: 'selectDrop',
      name: 'select or Dropdowns',
      label: 'Dropdown',
      placeholder: 'Name',
      options: ["Option1", "Option2"]
    },
    {
      id: Math.random(),
      type: 'textarea',
      rows: 4,
      cols: 10,
      name: 'Textarea',
      label: 'TextArea',
      placeholder: 'Type Something'
    },
    {
      id: Math.random(),
      type: 'fileUpload',
      multiple: false,
      accept: ['image/*'],
      name: 'File Upload',
      label: 'Choose File'
    },
    {
      id: Math.random(),
      type: 'slider',
      label: 'Slider',
      name: 'Slider',
      minimumValue: 1,
      maximumValue: 100,
    },
    {
      id: Math.random(),
      type: 'button',
      value: 'Submit',
      name: 'Button',
      backGroundColor: "green",
      fontColor: "white"
    }
  ]

  function save() {
    dispatch({
      type:'SAVE_FORM',
      dropped: dropped
    })
  }

  function PreviewForm() {
    dispatch({
      type:'SAVE_FORM',
      dropped: dropped
    })
    navigate(`/formbuilder/preview/${FormToShow.SelectedFormName}`, { state: { dropped } });
  }
  
  
  return (

    <DndProvider backend={HTML5Backend}>
    <div className='Main-container'>
      <div className="formBuilder-header">
        <div className="formBuilder-header-heading">
          <span className="formBuilder-header-name">Forms</span>
          <span className="formBuilder-header-slogan">View, Edit, or Create a new form</span>
        </div>
        <div className='formBuilder-header-button-container'>
          <Button className='Preview-button' onClick={()=>{PreviewForm()}}>Save and Preview Form</Button>
          <Button className='Save-button' onClick={()=>{save()}} >Save Form</Button>
        </div>
      </div>
      <div className="FormBuilder-container">

        <div className='navbar-container'>
          {compo.map((items) => {
            return <DraggableComponent data={items} /> 
          }) }
        </div>

        <div className='form-builder-container'>
        {<DroppableComponent dropped={dropped} setDropped={setDropped} />}
        </div>

      </div>

    </div>
    </ DndProvider>

  )
    
  }
export default FormBuilder;
