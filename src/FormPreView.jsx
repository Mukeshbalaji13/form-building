//FormPreView.jsx

import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Slider, TimePicker } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

export function FormPreView(){
    // const { previewformName } = useParams();
    const { state } = useLocation();
    const droppedArrayFromFormBuilder = state && state.dropped ? state.dropped : [];
    const FormToShow = useSelector((data)=>data)

    return(
        <>
        <div style={{backgroundColor:"#B1D4E0", width:"100%", height:"100vh", display:"flex", justifyContent:"center", overflow:"auto"}}>
            <div style={{width:"50%"}}>
                <div style={{width:"100%", height:"20%", backgroundColor:"#000039", marginTop:"20px", borderRadius:"10px 10px 0 0", color:"white", fontSize:"35px", fontWeight:"bolder", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {FormToShow.SelectedFormName}
                </div>
                {droppedArrayFromFormBuilder.map((e)=>{
                    if(e.type==="input-text"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <Input className="preview-field" type="text" placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}} required/>
                            </div>
                        )
                    }
                    else if(e.type==="input-number"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <InputNumber className="preview-field" type="text" placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}} min={e.minimumValue} max={e.maximumValue}/>
                            </div>
                        )
                    }
                    else if(e.type==="input-date"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <DatePicker className="preview-field" type="text" placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}/>
                            </div>
                        )
                    }
                    else if(e.type==="input-time"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <TimePicker className="preview-field" type="text" placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}/>
                            </div>
                        )
                    }
                    else if(e.type==="input-dateAndTime"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <DatePicker 
                                    className="preview-field"
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={e.placeholder}
                                    style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}
                                />
                            </div>
                        )
                    }
                    else if(e.type==="input-tel"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <input className="preview-field" type="tel" id="indianPhoneNumber" name="indianPhoneNumber" pattern="^[789]\d{9}$" placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}/>
                            </div>
                        )
                    }
                    else if(e.type==="input-url"){
                        let pattern = /^(ftp|http|https):\/\/[^ "]+$/;
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <input className="preview-field" type="url" pattern={pattern} placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}/>
                            </div>
                        )
                    }
                    else if(e.type==="textarea"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <textarea className="preview-field" name="textarea" id="textarea" cols={e.cols} rows={e.rows} placeholder={e.placeholder} style={{width:"50%", backgroundColor:"transparent", border:"none", borderBottom:"1px solid grey", borderRadius:"0px"}}/>
                            </div>
                        )
                    }
                    else if(e.type==="input-radio"){
                        return (
                            <div style={{width:"100%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", padding:"8px 0px 8px 20px", justifyContent:"space-evenly", paddingLeft:"20px", gap:"10px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}}>
                                    <Radio.Group name={e.label} className="preview-field">
                                        {e.options.map((f)=>{
                                            return (
                                                <div style={{display:"flex", flexWrap:"wrap", width:"30%", padding:"10px 0"}}>
                                                    <div  style={{display:"flex"}}>
                                                        <Radio value={f}>{f}</Radio>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Radio.Group>

                                </div>
                            </div>
                        )
                    }
                    else if(e.type==="input-checkbox"){
                        return (
                            <div style={{width:"100%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", padding:"8px 0px 8px 20px", justifyContent:"space-evenly", paddingLeft:"20px", gap:"10px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <div style={{display:"flex", flexWrap:"wrap", flexDirection:"column"}}>
                                        {e.options.map((g)=>{
                                            return (
                                                <div style={{display:"flex", flexWrap:"wrap", width:"30%", padding:"10px 0"}}>
                                                    <div  style={{display:"flex"}}>
                                                        <Checkbox name={g} value={g} className="preview-field">{g}</Checkbox>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )
                    }
                    else if(e.type==="selectDrop"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", padding:"8px 0px 8px 20px", justifyContent:"space-evenly", paddingLeft:"20px", gap:"10px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <div style={{width:"50%"}}>
                                    <Select style={{width:"100%"}} defaultValue={e.options[0]} placement="topLeft" className="preview-field">
                                        {e.options.map((o)=>{
                                            return <option value={o}>{o}</option>
                                        })}
                                    </Select>
                                </div>
                            </div>
                        )
                    }
                    else if(e.type==="fileUpload"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <input type="file" style={{width:"50%"}} className="preview-field"/>
                            </div>
                        )
                    }
                    else if(e.type==="slider"){
                        return (
                            <div style={{width:"100%", height:"25%", borderRadius:"5px", backgroundColor:"white", marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"space-evenly", paddingLeft:"20px", boxSizing:"border-box"}}>
                                <label htmlFor="input" style={{fontWeight:"bold"}}>{e.label}</label>
                                <Slider min={e.minimumValue} max={e.maximumValue} placeholder={e.placeholder} style={{width:"50%", backgroundColor:"lightgray", borderRadius:"20px"}} className="preview-field"/>
                            </div>
                        )
                    }
                    if(e.type==="button"){
                        return (
                            <div style={{width:"20%", marginTop:"20px", justifyContent:"space-evenly"}}>
                                <Button style={{width:"100%", height:"40px", backgroundColor:e.backGroundColor, color:e.fontColor, fontWeight:"bolder", marginBottom:"20px"}}>{e.name}</Button>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
        </div>
        </>
    )
}