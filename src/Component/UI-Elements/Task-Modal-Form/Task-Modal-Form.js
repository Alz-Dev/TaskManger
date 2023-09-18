import React, { useEffect, useState } from "react";
// import { DatePicker } from "zaman";
import DatePicker from "react-multi-date-picker"
import Select from 'react-select';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"


import './Task-Modal-Form.css';

const TaskModalForm = (props) => {
    return (
        <div className="Task-form-container">
            {(() => {
                if(props.selectedId === 0) {
                    return (
                        <div>
                            <h3>ثبت تسک جدید</h3>
                            <form>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(props.taskNameType === null ? {value:""} : {value: props.taskNameType})}
                                            onChange={props.changeNameType}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>عنوان تسک</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(props.taskDescriptionType === null ? {value:""} : {value: props.taskDescriptionType})}
                                            onChange={props.changeDescriptionType}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>توضیحات وظیفه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data-container">
                                        <label>اختصاص به:</label>
                                        <div className="select-data">
                                            <Select id="userIdSelector"
                                                options={props.usersIdList}
                                                placeholder="هیچ کس"
                                                value={props.realtimeSelectedUserIds}
                                                onChange={props.changeSelectedUserIds}
                                                isSearchable={true}
                                                isMulti 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data-container">
                                        <label>انتخاب پروژه:</label>
                                        <div className="select-data">
                                            <Select id="categoryIdSelector"
                                                options={props.categoriesIdList}
                                                placeholder="هیچ کدام"
                                                value={props.realtimeSelectedCategoryIds}
                                                onChange={props.changeSelectedCategoryIds}
                                                isSearchable={true}
                                                isMulti 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data DatePicker-body-container">
                                        <label>مهلت انجام تا تاریخ:</label>
                                        <div className="DatePicker-body d-inline-block">
                                            <DatePicker
                                            // {...(props.clearDate === true ? {} : {defaultValue: props.setDeadlineDate})}
                                            value= {props.setDeadlineDate}
                                            renderButton={(direction, handleClick) => (
                                                <button onClick={handleClick}>
                                                  {direction === "right" ? ">" : "<"}
                                                </button>
                                              )}
                                            minDate= {new Date()}
                                            // accentColor='#4a6fa5'
                                            onChange={props.changeDeadlineDate}
                                            // headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]} 
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            formatMonth={(month, year) => {
                                                return "ماه " + month;
                                              }}
                                              formatYear={(year, month) => {
                                                return "سال " + year;
                                              }}
                                            />
                                        </div>
                                        {/* <button type="clearer" value="clearer" onClick={props.actionRemoveDeadlineDate}>پاک کردن تاریخ</button> */}
                                    </div>
                                </div>
                                <div className="form-row">
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
                            <h3>ویرایش تسک {props.selectedIdTitle}</h3>
                            <form>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(props.taskNameType === null ? {value:""} : {value: props.taskNameType})}
                                            onChange={props.changeNameType}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>عنوان تسک</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data">
                                        <input
                                            type="text"
                                            {...(props.taskDescriptionType === null ? {value:""} : {value: props.taskDescriptionType})}
                                            onChange={props.changeDescriptionType}
                                            required
                                        />
                                        <div className="underline"/>
                                        <label>توضیحات وظیفه</label>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data-container">
                                        <label>اختصاص به:</label>
                                        <div className="select-data">
                                            <Select id="userIdSelector"
                                                options={props.usersIdList}
                                                placeholder="هیچ کس"
                                                value={props.realtimeSelectedUserIds}
                                                onChange={props.changeSelectedUserIds}
                                                isSearchable={true}
                                                isMulti 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="select-data-container">
                                        <label>انتخاب پروژه:</label>
                                        <div className="select-data">
                                            <Select id="categoryIdSelector"
                                                options={props.categoriesIdList}
                                                placeholder="هیچ کدام"
                                                value={props.realtimeSelectedCategoryIds}
                                                onChange={props.changeSelectedCategoryIds}
                                                isSearchable={true}
                                                isMulti 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-data DatePicker-body-container">
                                        <label>مهلت انجام تا تاریخ:</label>
                                        <div className="DatePicker-body d-inline-block">
                                            <DatePicker
                                            // {...(props.clearDate === true ? {} : {defaultValue: props.setDeadlineDate})}
                                            value= {props.setDeadlineDate}
                                            minDate= {new Date()}
                                            renderButton={(direction, handleClick) => (
                                                <button onClick={handleClick}>
                                                  {direction === "right" ? ">" : "<"}
                                                </button>
                                              )}
                                            // headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]} 
                                            onChange={props.changeDeadlineDate}
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            formatMonth={(month, year) => {
                                                return "ماه " + month;
                                              }}
                                              formatYear={(year, month) => {
                                                return "سال " + year;
                                              }}
                                            />
                                        </div>
                                        {/* <button type="clearer" value="clearer" onClick={props.actionRemoveDeadlineDate}>پاک کردن تاریخ</button> */}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="submit-btn">  
                                        {/* <button type="cancel" onClick={(e) =>{e.preventDefault(); window.history.back()}}>انصراف</button> */}
                                        <button type="submit" value="submit" onClick={props.actionAddNew}>ویرایش</button>
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

export default TaskModalForm;