//DroppableComponent.jsx
import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FormComponents } from "./FormComponents";
import { useDispatch, useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";

export function DroppableComponent(props){
const dispatch = useDispatch()
const formComponents = useSelector((state) => state.componentsDropped);


    // const [{canDrop, isOver}, drop] = useDrop({
    //     accept: 'item',
    //     drop: (item) => {
    //         props.setDropped([...props.dropped, item])
            
    //     },
    //     collect: monitor => ({
    //         isOver: monitor.isOver(),
    //         canDrop: monitor.canDrop()
    //     })
    // })


    return(
        <>
            <div  className='form-builder'>
                <FormComponents dropped={props.dropped} setDropped={props.setDropped}/>
            </div>
        </>
    )
}