import React, { useEffect, useState } from "react";

import './Project-Modal-Form.css';

const ProjectModalForm = (props) => {
    const [ pNameValue, setPNameValue ] = useState(null);
    const [ pDescriptionValue, setPDescriptionValue ] = useState(null);
    useEffect(()=> {
        setPNameValue(props.projectNameType);
        console.log(pNameValue);
    }, [props.projectNameType])
    useEffect(()=> {
        setPDescriptionValue(props.projectDescriptionType);
        console.log(pDescriptionValue)
    }, [props.projectDescriptionType])
    return (
        <div className="project-form-container">
            {(() => {
                if(props.selectedId === 0) {
                    return (
                        <div>
                            <h3>ثبت پروژه جدید</h3>
                            <form>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(pNameValue === null ? {value:""} : {value: props.projectNameType})}
                                            // {...{defaultValue: props.projectNameType}}
                                            // {...{value: props.projectNameType}}
                                            onChange={props.changeName}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>نام پروژه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(pDescriptionValue === null ? {value:""} : {value: props.projectDescriptionType})}
                                            // {...{defaultValue: props.projectDescriptionType}}
                                            // {...{value: props.projectDescriptionType}}
                                            onChange={props.changeDescription}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>توضیحات پروژه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data d-block">
                                        <label>پروفایل سازنده:</label>
                                        <select id="idSelector"  onChange={props.changeSelectedId} required>
                                            <option selected="true" disabled="disabled">یک شخص را انتخاب کنید</option> 
                                            {props.listIds}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row d-inline">
                                    <div className="submit-btn">  
                                        {/* <button type="cancel" onClick={(e) =>{e.preventDefault(); window.history.back()}}>انصراف</button> */}
                                        <button type="submit" value="submit" onClick={props.actionAddNew}>ثبت</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <h3>ویرایش پروژه {props.selectedIdTitle}</h3>
                            <form>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(pNameValue === null ? {value:""} : {value: props.projectNameType})}
                                            // {...{defaultValue: props.projectNameType}}
                                            // {...{value: props.projectNameType}}
                                            onChange={props.changeName}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>نام پروژه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text" 
                                            {...(pDescriptionValue === null ? {value:""} : {value: props.projectDescriptionType})}
                                            // {...{defaultValue: props.projectDescriptionType}}
                                            // {...{value: props.projectDescriptionType}}
                                            onChange={props.changeDescription}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>توضیحات پروژه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data d-block">
                                        <label>پروفایل سازنده:</label>
                                        <select id="idSelector" onChange={props.changeSelectedId} required>
                                        <option disabled="disabled" label="یک شخص را انتخاب کنید"></option> 
                                            {props.listIds}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row d-inline">
                                    <div className="submit-btn">  
                                        {/* <button type="cancel" onClick={props.cancelModal}>انصراف</button> */}
                                        <button type="submit" value="submit" onClick={props.actionEdit}>ویرایش</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export default ProjectModalForm;