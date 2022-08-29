import * as React from "react";
import '../styles/adminform.css';
import { Button, Form } from "react-bootstrap";
import { validate } from "../functions/Validation";
import { useEffect, useState } from "react";
import DataApi from "../functions/DataApi";
const Adminform = (props) => {
    const initialValues = {
        docId: props.flag ? '' : props.data.doc_id,
        hospName: props.flag ? '' : props.data.hosp_name,
        hospLoc: props.flag ? '' : props.data.hosp_location,
        mobNumber: props.flag ? '' : props.data.doc_number,
        docName: props.flag ? '' : props.data.doc_name,
        docSpec: props.flag ? '' : props.data.spec_name,
        addDays: props.flag ? [] : props.data.date
    }

    const [users, setUsers] = useState([]);
    const [formValues, setformValues] = useState(initialValues)
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});
    const data = [
        { name: 'SUNDAY' },
        { name: 'MONDAY' },
        { name: 'TUESDAY' },
        { name: 'WEDNESDAY' },
        { name: 'THURSDAY' },
        { name: 'FRIDAY' },
        { name: 'SATURDAY' }
    ]
    useEffect(() => {
        if (props.flag === true) {
            setUsers(data)
        } else {
            setUsers(props.data.date)
        }
    }, [props.flag])
    const handleSubmit = (event) => {
        if (validated === false) {
            event.preventDefault()
            event.stopPropagation()
            setError(validate(formValues))
        }
        else if (validated === true) {
            DataApi(props.flag, formValues)
        }
    }
    const errorHandle = (event) => {
        const { name, value } = event.target;
        const errors = error
        if (name === "docId") {
            if (value === '') {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docId = "Doctor ID Required"

            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docId = null
            }
        }
        if (name === "hospLoc") {
            if (value === '') {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.hosploc = "Hospital Location Required"
            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.hosploc = null
            }
        }
        if (name === "hospName") {
            if (value === '') {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.hospName = "Hospital name is Require"
            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.hospName = null
            }
        }
        if (name === "docName") {
            if (value === '') {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docName = "Doctor Name is Required"
            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docName = null
            }
        }
        if (name === "docSpec") {
            if (value === '') {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docSpec = "Specialization is Required"
            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.docSpec = null
            }
        }
        if (name === 'mobNumber') {
            if (!/^[0-9\b]+$/.test(value)) {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.mobNumber = "Enter Valid Number"
            }
            if (value.length !== 10 || value === "") {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.mobNumber = "Enter Valid Number"
            }
            else {
                setformValues({
                    ...formValues, [name]: value
                })
                errors.mobNumber = null
            }
            if (name === null) {

            }
        }
        setError(errors)
    }
    const handleChange = (e) => {
        const errors = error
        const { name, checked } = e.target
        if (name === 'allselect') {
            let val = users.map((user) => {
                return { ...user, isChecked: checked }
            })
            setUsers(val)
            if (val.filter((user) => user?.isChecked === true).length === 7) {
                setformValues({ ...formValues, addDays: val })
                errors.addDays = null
            }
            else {
                setformValues({ ...formValues, addDays: val })
                errors.addDays = 'Select Atleast One Day'
            }
        }
        else {
            let val = users.map(user => user.name === name ? { ...user, isChecked: checked } : user)
            setUsers(val)
            if (val.filter((user) => user?.isChecked === true).length > 0) {
                setformValues({ ...formValues, addDays: val })
                errors.addDays = null

            }
            else {
                setformValues({ ...formValues, addDays: val })
                errors.addDays = 'Select Atleast One Day'
            }
        }
        setError(errors)
    }
    useEffect(() => {
        if (Object.values(error).filter((i) => i === null).length >= 7 || props.flag === false) {
            setValidated(true)
            setVisible(false)
        } else {
            setValidated(false)
            setVisible(true)
        }
    }, [error, props.flag, formValues])
    return (
        <div className="center">
            <div className="details">
                <h2>Enter Details</h2>
                <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
                    <div>
                        <label htmlFor="docId">Doctor ID:</label>
                        <input required type="text" id="docId" name="docId"
                            autoComplete="off"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            readOnly={!props.flag}
                            value={formValues.docId} onChange={(event) => errorHandle(event)}
                            placeholder="Doctor ID" />
                        <p>{error.docId}</p>
                    </div>
                    <div>
                        <label htmlFor="hosploc">Hospital Location:</label>
                        <input required type="text" id="hosploc" name="hospLoc"
                            autoComplete="off"
                            onKeyPress={(event) => {
                                if (!/[a-zA-Z]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={formValues.hospLoc} onChange={(event) => errorHandle(event)}
                            placeholder="Hospital Location" />
                        <p>{error.hosploc}</p>
                    </div>
                    <div>
                        <label htmlFor="hospName">Hospital Name:</label>
                        <input required type="text" id="hname" name="hospName"
                            autoComplete="off"
                            onKeyPress={(event) => {
                                if (!/[a-zA-Z]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={formValues.hospName} onChange={(event) => errorHandle(event)}
                            placeholder="Hospital Name" />
                        <p>{error.hospName}</p>
                    </div>
                    <div>
                        <label htmlFor="docName">Doctor Name:</label>
                        <input required type="text" id="dname" name="docName"
                            autoComplete="off"
                            onKeyPress={(event) => {
                                if (!/[a-zA-Z]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={formValues.docName} onChange={(event) => errorHandle(event)} placeholder="Doctor" />
                        <p>{error.docName}</p>
                    </div>
                    <div>
                        <label htmlFor="dSpec">Doctor Specialization:</label>
                        <input required type="text" id="dSpec" name="docSpec"
                            autoComplete="off"
                            onKeyPress={(event) => {
                                if (!/[a-zA-Z]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={formValues.docSpec} onChange={(event) => errorHandle(event)}
                            placeholder="Specialization" />
                        <p>{error.docSpec}</p>
                    </div>
                    <div>
                        <label htmlFor="lmobile">Mobile Number:</label>
                        <input required type="text" id="lmobile" name="mobNumber"
                            autoComplete="off"
                            maxLength={10}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={formValues.mobNumber} onChange={(event) => errorHandle(event)}
                            placeholder="Your Mobile Number" />
                        <p>{error.mobNumber}</p>
                    </div>
                    <label>Select Your Day:</label>
                    <div className="form-check">
                        <input type='checkbox' className='form-check-input'
                            checked={users.filter((user) => user?.isChecked !== true).length < 1}
                            name='allselect' onChange={handleChange} />
                        <label className="form-check-label ms-2">All Select</label>
                        {
                            users.map((day) => (
                                <div className="form-check" key={day.name}>
                                    <input type='checkbox' className='form-check-input'
                                        checked={day?.isChecked || false}
                                        name={day.name} onChange={handleChange} />
                                    <label className="form-check-label ms-2">{day.name}</label>
                                </div>
                            ))
                        }
                    </div>
                    <p>{error.addDays}</p>
                    <Button className="Submit" type="submit" disabled={visible}>Submit form</Button>
                    {/* <Multiselect
                        disablePreSelectedValues={true}
                        className="multiselect"
                        placeholder="Select Days"
                        options={options} displayValue='days' onSelect={selectedValues} onRemove={removeDays} /><br />
                    <label>{props.flag ? error.addDays : <p style={{ color: 'black' }}>If you won't select. It will take Existing Days</p>}</label>
                    <Button type="submit" disabled={visible}>Submit form</Button> */}

                </Form>
            </div>

        </div>
    )
}

export default Adminform