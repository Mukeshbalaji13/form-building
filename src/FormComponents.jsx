//FormComponents.jsx
import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Select, TimePicker, Slider } from "antd";
// import { useSelector } from "react-redux";
import EditIcon from "./Assets/edit icon.png";
import DeleteIcon from "./Assets/delete icon.png";
import CancelIcon from "./Assets/cancel button.png"
import { useDrop } from "react-dnd";

export function FormComponents(props) {
    // const ComponentsCollected = useSelector((data)=>data.componentsDropped)
    // const [editOption, setEditOption] =useState(false);
    const [ModalOption, setModalOption] = useState(null);
    const [RadioButtonsOptions, setRadioButtonsOptions] = useState([]);
    const [CheckBoxesOptions, setCheckBoxesOptions] = useState([]);
    const [DropDownOptions, setDropDownOptions] = useState([]);
   


    const [{canDrop}, drop] = useDrop({
        accept: 'item',
        drop: (item) => {
            props.setDropped([...props.dropped, item])
            
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    
    function fieldsEdit(field){
        setModalOption(field);
        props.dropped.forEach((e)=>{
            if(e.id===field.id && e.type==="input-radio"){
                setRadioButtonsOptions(e.options)
            }
            else if(e.id===field.id && e.type==="input-checkbox"){
                setCheckBoxesOptions(e.options)
            }
            else if(e.id===field.id && e.type==="selectDrop"){
                setDropDownOptions(e.options)
            }
        })
    }

    function deleteFields(field, deleteindex){
        const deletedField = props.dropped.filter((_, index)=> index!==deleteindex);
        props.setDropped(deletedField)
    }

    function change() {
        const updatedDropped = props.dropped.map((item) => {
          if (item.id === ModalOption.id) {
            if(ModalOption && (ModalOption.type==="input-text" || ModalOption.type==="input-date" || ModalOption.type==="input-time" || ModalOption.type==="input-dateAndTime" || ModalOption.type==="input-url" || ModalOption.type==="input-tel")){
                return {
                    ...item, 
                    label: ModalOption.label, 
                    placeholder: ModalOption.placeholder
                }
            }
            else if(ModalOption && ModalOption.type==="input-number"){
                return {
                    ...item, 
                    label: ModalOption.label, 
                    placeholder: ModalOption.placeholder, 
                    minimumValue: ModalOption.minimumValue,
                    maximumValue: ModalOption.maximumValue
                }
            }
            else if(ModalOption && ModalOption.type==="textarea"){
                return {
                    ...item, 
                    label: ModalOption.label, 
                    placeholder: ModalOption.placeholder, 
                    rows: ModalOption.rows,
                    cols: ModalOption.cols
                }
            }
            else if(ModalOption && ModalOption.type==="fileUpload"){
                return {
                    ...item,
                    label: ModalOption.label
                }
            }
            else if(ModalOption && ModalOption.type==="slider"){
                return {
                    ...item,
                    label: ModalOption.label,
                    minimumValue: parseInt(ModalOption.minimumValue),
                    maximumValue: parseInt(ModalOption.maximumValue)
                }
            }
            else if(ModalOption && ModalOption.type==="button"){
                return{
                    ...item,
                    name: ModalOption.name,
                    backGroundColor: ModalOption.backGroundColor,
                    fontColor: ModalOption.fontColor
                }
              }
            else if(ModalOption && ModalOption.type==="input-radio"){
                let newRadios= RadioButtonsOptions.filter(option=> option!=='')

                return{
                    ...item,
                    label: ModalOption.label,
                    options: newRadios
                }
              }
            else if(ModalOption && ModalOption.type==="input-checkbox"){
                let newChecks= CheckBoxesOptions.filter(option=> option!=='')

                return{
                    ...item,
                    label: ModalOption.label,
                    options: newChecks
                }
              }
            else if(ModalOption && ModalOption.type==="selectDrop"){
                let newDropDowns = DropDownOptions.filter(option=> option!=='')
                return{
                    ...item,
                    label: ModalOption.label,
                    options: newDropDowns
                }
            }
            return item;
          }
          else{
            return item;
          }
        });
      
        props.setDropped(updatedDropped);
        // setEditOption(false);
        // setRadioButtonsOptions([]);
        // setCheckBoxesOptions([]);
        // setDropDownOptions([])
      }
    

    function addingradioButtonOptions(){
        setRadioButtonsOptions([...RadioButtonsOptions, ''])
    }

    function addingCheckboxesOptions(){
        setCheckBoxesOptions([...CheckBoxesOptions, '']);
    }

    function addingDropDownOptions(){
        setDropDownOptions([...DropDownOptions, ''])
    }

    function cancelRadioOption(_, deleteindex){
        const updatedRadioButtonsOptions = RadioButtonsOptions.filter((_, index)=> index!==deleteindex);
        setRadioButtonsOptions(updatedRadioButtonsOptions);
    }

    function cancelCheckBoxOption(_, deleteindex){
        const updatedCheckBoxesOptions = CheckBoxesOptions.filter((_, index)=> index!==deleteindex);
        setCheckBoxesOptions(updatedCheckBoxesOptions);
    }

    function cancelDropDownOptions(_, deleteindex){
        const updatedDropDownOptions = DropDownOptions.filter((_, index)=> index!==deleteindex);
        setDropDownOptions(updatedDropDownOptions);
    }
    return(
        <>
    <div style={{width:"100%", height:"100%", display:"flex"}}>
    <div ref={drop} style={{width:"60%", display:"flex", alignItems:"center", flexDirection:"column", overflow:"auto", border: canDrop? "2px dashed green" : "2px solid #808080", backgroundColor: canDrop? "rgba(54, 108, 26, 0.26)" : "white"}}>

{props.dropped?.map((e, index) => {

if(e.type==="input-text"){
    return (
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <Input style={{width:"80%", height:"40px", border:"1.5px solid black", borderRadius:"0px"}} placeholder={e.placeholder} type="text" disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} onClick={()=>{deleteFields(e, index)}} src={DeleteIcon} alt="buuton"/>
            </button>
        </div>
    )
}
else if(e.type==="input-number"){
    return (
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <InputNumber style={{width:"80%", height:"40px", border:"1.5px solid black", borderRadius:"0px"}} placeholder={e.placeholder} type="number" min={e.minimumValue} max={e.maximumValue}  disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="input-date"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <DatePicker placeholder={e.placeholder}  disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="input-time"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <TimePicker placeholder={e.placeholder} disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="input-dateAndTime"){
    return(

        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={e.placeholder}
          disabled
          />
           <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}
else if(e.type==="input-tel"){
        return (
            <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <input style={{width:"80%", height:"35px", border:"1.5px solid black", borderRadius:"0px"}} type="tel" id="indianPhoneNumber" name="indianPhoneNumber" pattern="^[789]\d{9}$" placeholder={e.placeholder} disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
        )
}

else if(e.type==="input-url"){
    let pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="input" style={{fontWeight:"bolder"}}>{e.label}</label>
            <input style={{width:"80%", height:"35px", border:"1.5px solid black", borderRadius:"0px"}} type="url" pattern={pattern} placeholder={e.placeholder} disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="textarea"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="textarea" style={{fontWeight:"bolder"}}>{e.label}</label>
            <textarea name="textarea" id="textarea" cols={e.cols} rows={e.rows} placeholder={e.placeholder} disabled></textarea>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="input-radio"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px", gap:"15px"}}>
            <label htmlFor="input">{e.label}</label>
            <div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}}>
            <Radio.Group name={e.label} disabled style={{fontWeight:"bold"}}>
                {e.options.map((f)=>{
                    return (
                        <div style={{display:"flex", flexWrap:"wrap", width:"60%"}}>
                            <div  style={{display:"flex"}}>
                            <Radio value={f}>{f}</Radio>
                            </div>
                        </div>
                    )
                })}
                </Radio.Group>

            </div>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="input-checkbox"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px", gap:"15px"}}>
            <label htmlFor="input">{e.label}</label>
            <div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}}>
                {e.options.map((g)=>{
                    return (
                        <div style={{display:"flex", flexWrap:"wrap", width:"60%"}}>
                            <div  style={{display:"flex"}}>
                            <Checkbox name={g} value={g}  disabled style={{fontWeight:"bold"}}>{g}</Checkbox>
                            </div>
                        </div>
                    )
                })}

            </div>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="selectDrop"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px", gap:"15px"}}>
            <label htmlFor="input">{e.label}</label>
            <div>
                <Select style={{width:"80%"}} defaultValue={e.options[0]}>
                    {e.options.map((o)=>{
                        return <option value={o} disabled>{o}</option>
                    })}
                </Select>
            </div>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="fileUpload"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
            <label htmlFor="fileUpload" style={{fontWeight:"bolder"}}>{e.label}</label>
            <input type="file" style={{marginTop:"10px"}} disabled/>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="slider"){
    return(
        <div style={{width:"90%", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", marginTop:"15px"}}>
             <label htmlFor="fileUpload" style={{fontWeight:"bolder"}}>{e.label}</label>
             <Slider min={e.minimumValue} max={e.maximumValue}/>
             <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}

else if(e.type==="button"){
    // const color= e.color;
    return (
        <div style={{width:"90%", height:"50px", border:"1px dashed black", display:"flex", flexDirection:"column", padding:"8px", position:"relative", alignItems:"center", justifyContent:"center", marginTop:"15px"}}>
            <Button style={{width:"70%", height:"40px", backgroundColor:e.backGroundColor, color:e.fontColor}} disabled>{e.name}</Button>
            <button style={{position: "absolute", top: "-10px", right: "35px", backgroundColor: "#008000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex",  justifyContent:"center"}}  onClick={()=>{fieldsEdit(e)}}>
                <img  style={{width:"250%", height:"100%"}} src={EditIcon} alt="buuton"/>
            </button>
            <button style={{position: "absolute", top: "-10px", right: "5px", backgroundColor: "#cc0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer", borderRadius: "50px", width:"25px", height:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img  style={{width:"280%", height:"100%"}} src={DeleteIcon} onClick={()=>{deleteFields(e, index)}} alt="buuton"/>
            </button>
        </div>
    )
}
return null;

})}

      </div>
      <div style={{width:"40%", height:"100%", backgroundColor:"#BFD7ED", display:"flex", alignItems:"center", flexDirection:"column"}}>
        <div style={{width:"100%", height:"10%", backgroundColor:"#000039", color:"white", fontSize:"25px", fontWeight:"bolder", display:"flex", justifyContent:"center", alignItems:"center"}}>
            Edit Box
        </div>
        <div style={{height:"90%", width:"100%"}}>
      { ModalOption && (
                 (ModalOption.type==="input-text" || ModalOption.type==="input-date" || ModalOption.type==="input-time" || ModalOption.type==="input-dateAndTime" || ModalOption.type==="input-url" || ModalOption.type==="input-tel")?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"100%", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Label</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}}  value={ModalOption.label} type="text" placeholder="Edit Label" onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column",width:"80%"}}>
                            <label  style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Placeholder</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.placeholder} type="text" placeholder="Edit placeholder" onChange={(e)=>{setModalOption({...ModalOption, placeholder: e.currentTarget.value})}}/>
                        </div>
                        <Button onClick={()=>{change()}} style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    </div>:
                ModalOption.type==="input-number"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"100%", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Label</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.label} type="text" placeholder="Edit Label" onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Placeholder</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.placeholder} type="text" placeholder="Edit placeholder" onChange={(e)=>{setModalOption({...ModalOption, placeholder: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Minimum Value</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.minimumValue} type="text" placeholder="Edit Minimum value" onChange={(e)=>{setModalOption({...ModalOption, minimumValue: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Maximum Value</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.maximumValue} type="text" placeholder="Edit Maximum Value" onChange={(e)=>{setModalOption({...ModalOption, maximumValue: e.currentTarget.value})}}/>
                        </div>
                        <Button onClick={()=>{change()}} style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    </div>:
                    ModalOption.type==="textarea"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"100%", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Label</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.label} type="text" placeholder="Edit Label" onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Placeholder</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.placeholder} type="text" placeholder="Edit placeholder" onChange={(e)=>{setModalOption({...ModalOption, placeholder: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label  style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Rows</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.rows} type="text" placeholder="Edit Rows" onChange={(e)=>{setModalOption({...ModalOption, rows: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label  style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Columns</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.cols} type="text" placeholder="Edit Columns" onChange={(e)=>{setModalOption({...ModalOption, cols: e.currentTarget.value})}}/>
                        </div>
                        <Button onClick={()=>{change()}}  style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    </div>:
                    ModalOption.type==="button"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"100%", justifyContent:"space-around"}}>
                       
                            <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                                <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Button Name</label>
                                <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.name} type="text" placeholder="Edit Button Name" onChange={(e)=>{setModalOption({...ModalOption, name: e.currentTarget.value})}}/> 
                            </div>
                            <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                                <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Background Color</label>
                                <input  style={{width:"100%", height:"40px"}} value={ModalOption.backGroundColor} type="color" placeholder="Edit Background Color" onChange={(e)=>{setModalOption({...ModalOption, backGroundColor: e.currentTarget.value})}}/>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                                <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Font Color</label>
                                <input  style={{width:"100%", height:"40px"}} value={ModalOption.fontColor} type="color" placeholder="Edit Background Color" onChange={(e)=>{setModalOption({...ModalOption, fontColor: e.currentTarget.value})}}/>
                            </div>
                            <Button onClick={()=>{change()}} style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    
                    </div>:
                    ModalOption.type==="input-radio"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"99%", justifyContent:"space-around", position:"relative", overflow:"auto"}}>
                        <div style={{width:"85%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="input">Radio Name</label>
                            <Input placeholder="Radio Button For" style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.label} onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div  style={{display:"flex", flexDirection:"column", width:"80%", height:"70%", overflow:"auto", gap:"10px"}}>
                            {RadioButtonsOptions && RadioButtonsOptions.map((radio, index)=>{
                                return(
                                    <>
                                    <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="">{`Option ${index + 1}`}</label>
                                    <div style={{width:"100%", position:"relative"}}>
                                        <Input style={{width:"95%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} key={index} placeholder={`Option ${index + 1}`} value={radio} onChange={(e)=>{
                                            const updatedRadioButtons = [...RadioButtonsOptions];
                                            updatedRadioButtons[index] = e.currentTarget.value;
                                            setRadioButtonsOptions(updatedRadioButtons);
                                        }}/>
                                            <img src={CancelIcon} style={{width:"8%", height:"55%", cursor:"pointer", position:"absolute", top:"-10px", right:"7px"}} onClick={()=>{cancelRadioOption(radio, index)}} alt="buuton"/>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                        <div style={{width:"100%", display:"flex", justifyContent:"space-evenly", position:"sticky", bottom:"10px"}}>
                            <button onClick={()=>{addingradioButtonOptions()}} style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Add More</button>
                            <button onClick={()=>{change()}} style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</button>
                        </div>
                    </div>:
                    ModalOption.type==="input-checkbox"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"99%", justifyContent:"space-around", position:"relative", overflow:"auto"}}>
                        <div style={{width:"85%"}}>
                        <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="input">Checkbox Name</label>
                            <Input placeholder="Radio Button For"  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.label} onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%", height:"70%", overflow:"auto", gap:"10px"}}>
                            {CheckBoxesOptions && CheckBoxesOptions.map((check, index)=>{
                                return(
                                    <>
                                    <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="">{`Option ${index + 1}`}</label>
                                    <div style={{width:"100%", position:"relative"}}>
                                    <Input style={{width:"95%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} key={index} placeholder={`Option ${index + 1}`} value={check} onChange={(e)=>{
                                        const updatedCheckBoexes = [...CheckBoxesOptions];
                                        updatedCheckBoexes[index] = e.currentTarget.value;
                                        setCheckBoxesOptions(updatedCheckBoexes);
                                    }}/>
                                    <img src={CancelIcon} style={{width:"8%", height:"55%", cursor:"pointer", position:"absolute", top:"-10px", right:"7px"}} onClick={()=>{cancelCheckBoxOption(check, index)}} alt="buuton"/>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                        <div style={{width:"100%", display:"flex", justifyContent:"space-evenly", position:"sticky", bottom:"10px"}}>
                            <button onClick={()=>{addingCheckboxesOptions()}} style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Add More</button>
                            <button onClick={()=>{change()}} style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</button>
                        </div>
                    </div>:
                     ModalOption.type==="selectDrop"?
                     <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"99%", justifyContent:"space-around", position:"relative", overflow:"auto"}}>
                        <div style={{width:"85%"}}>
                        <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="input">Dropdown Name</label>
                        <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} type="text" value={ModalOption.label} onChange={(e)=>{setModalOption({...ModalOption, label:e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%", height:"70%", overflow:"auto", gap:"10px"}}>
                            {DropDownOptions && DropDownOptions.map((drop, index)=>{
                                return(
                                    <>
                                    <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="">{`Option ${index + 1}`}</label>
                                    <div style={{width:"100%", position:"relative"}}>
                                    <Input style={{width:"95%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} type="text" value={drop} placeholder={`Option ${index + 1}`} onChange={(e)=>{
                                        const updatedDropDownOptions =  [...DropDownOptions];
                                        updatedDropDownOptions[index]=e.target.value;
                                        setDropDownOptions(updatedDropDownOptions)
                                    }}/>
                                    <img src={CancelIcon} style={{width:"8%", height:"55%", cursor:"pointer", position:"absolute", top:"-10px", right:"7px"}} onClick={()=>{cancelDropDownOptions(drop, index)}} alt="buuton"/>
                                    </div>
                                    </>

                                )
                            })}
                        </div>
                        <div style={{width:"100%", display:"flex", justifyContent:"space-evenly", position:"sticky", bottom:"10px"}}>
                        <button onClick={()=>{addingDropDownOptions()}}  style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Add More</button>
                        <button onClick={()=>{change()}} style={{width:"30%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</button>
                        </div>
                     </div>:
                      ModalOption.type==="fileUpload"?
                      <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"50%", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Label</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}}  value={ModalOption.label} type="text" placeholder="Edit Label" onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <Button onClick={()=>{change()}} style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    </div>:
                    ModalOption.type==="slider"?
                    <div style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center", height:"100%", justifyContent:"space-around"}}>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Label</label>
                            <Input style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.label} type="text" placeholder="Edit Label" onChange={(e)=>{setModalOption({...ModalOption, label: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Minimum Value</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.minimumValue} type="text" placeholder="Edit Minimum value" onChange={(e)=>{setModalOption({...ModalOption, minimumValue: e.currentTarget.value})}}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
                            <label style={{fontSize:"20px", fontWeight:"bolder"}} htmlFor="edit">Maximum Value</label>
                            <Input  style={{width:"100%", height:"40px", backgroundColor:"#f0f8ff", fontSize:"16px"}} value={ModalOption.maximumValue} type="text" placeholder="Edit Maximum Value" onChange={(e)=>{setModalOption({...ModalOption, maximumValue: e.currentTarget.value})}}/>
                        </div>
                        <Button onClick={()=>{change()}} style={{width:"80%", height:"40px", backgroundColor:"#003060", border:"none", color:"white", fontSize:"16px", fontWeight:"bolder"}}>Submit</Button>
                    </div>:

                    <div>no</div>
            )}

            </div>

      </div>
      </div>

        </>
    )
}