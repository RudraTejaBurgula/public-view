import * as React from "react";
import '../styles/dashboard.css';
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { countContext } from "../App";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRef } from "react";
const Dashboard = () => {
  const [visibility, setVisible] = useState(true)
  const hospRef = useRef();
  const specialRef = useRef();
  const doctRef = useRef();
  const [startDate, setStartDate] = useState();
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState("");
  const countCountext = useContext(countContext);
  const name = countCountext.countState.basket[0].name;
  const mobile = countCountext.countState.basket[0].mobile;
  const navigate = useNavigate();
  const [hospNameRef, sethospNameRef] = useState([])
  const [specRef, setspecRef] = useState([])
  const [docRef, setdocRef] = useState([])
  useEffect(() => {
    console.log(hospRef.current.value, specialRef.current.value, doctRef.current.value)
    if (startDate !== undefined && name !== '' && mobile !== '' && hospRef.current.value !== 'Select One' && specialRef.current.value !== 'Select One' && doctRef.current.value !== 'Select One') {
      setLoading(true)
    }
    else {
      setLoading(false)
    }

  }, [][startDate, name, mobile, hospRef, specialRef, doctRef])
  const gethospName = (date) => {
    setStartDate(date)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    axios.get(`http://localhost:5000/hospName/${weekday[date.getDay()]}`)
      .then(response => {
        console.log(response)
        if (response.data.length !== null) {
          sethospNameRef(response.data);
          setVisible(false)
        }
        else { setVisible(true) }
      })
      .catch(error => console.log(error))
  }
  //specialization
  const getSpec = (hosp_value) => {
    axios.get(`http://localhost:5000/spec/${hosp_value}`)
      .then(response => { setspecRef(response.data); })
      .catch(error => console.log(error))
  }
  //doctor name
  const getDoc = (spec_value) => {
    axios.get(`http://localhost:5000/docName/${spec_value}`)
      .then(response => { setdocRef(response.data) })
      .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(false)
    const message = `Hi ${name}, Your Appointment booked on ${startDate.toDateString()}, at ${hospRef.current.value} with ${doctRef.current.value}`
    const recipient = mobile;
    //console.log(hospRef.current.value, message, recipient, doctRef.current.value, specialRef.current.value)
    fetch(`http://localhost:5000/sendtext?recipient=${recipient}&textmessage=${message}`)
      .catch(error => console.log(error));
    axios.post('http://localhost:5000/data', {
      doc_name: doctRef.current.value,
      patient_name: name,
      hosp_name: hospRef.current.value,
      spec_name: specialRef.current.value,
      date: startDate.toDateString(),
      patient_number: recipient
    }).then(response => { console.log(response.status, response); navigate('/Dashboard', { replace: true }) })
      .catch(error => console.log(error));
  }
  return (
    <div className="center">
      <div className="select">
        <h2>Register Your Appointment</h2>
        <form onSubmit={handleSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th className="col-5">Enter Your Name:</th>
                <th className="col-5 offset-2">Registered Mobile Number:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-5">
                  <input required disabled value={name} type="text" id="lname" name="lastname" placeholder="Your name.." />
                </td>
                <td className="col-5 offset-2">
                  <input required disabled value={mobile} type="text" id="lmobile" placeholder="Your Mobile Number" />

                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th className="col-5">Select Your Date:</th>
                <th className="col-5 offset-2">Select Hospital:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-5">
                  <DatePicker
                    className="DatePicker"
                    required
                    placeholder="Select date"
                    selected={startDate}
                    minDate={new Date() - 1}
                    selectsStart
                    startDate={startDate}
                    timeIntervals={20}
                    onChange={(date) => { gethospName(date) }}
                  />
                </td>
                <td className="offset-2 col-5">
                  <select onChange={(e) => getSpec(e.target.value)} required disabled={visibility} ref={hospRef}>
                    <option key="default">Select One</option>
                    {hospNameRef.map((name) => <option key={name.hosp_name}>{name.hosp_name}</option>)}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th className="col-5">Select Specialization:</th>
                <th className="col-5 offset-2">Select Doctor:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-5">
                  <select onChange={(e) => getDoc(e.target.value)} required disabled={visibility} ref={specialRef}>
                    <option>Select One</option>
                    {specRef.map((name) => <option key={name.spec_name}>{name.spec_name}</option>)}
                  </select>
                </td>
                <td className="offset-2 col-5">
                  <select required disabled={visibility} ref={doctRef} onChange={(e) => setDoctor(e.target.value)}>
                    <option>Select One</option>
                    {docRef.map((name) => <option key={name.doc_name}>{name.doc_name}</option>)}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="col-5 button">
                  {loading && <Button className='btn btn-primary' type='submit'>Get Appointment</Button>}
                </td>
                <td className="offset-2 col-5 text-right">
                  <Button className="btn btn-secondary" onClick={(e) => { navigate('/signUp', { replace: true }) }}>LOG OUT</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

    </div>
  );
}

export default Dashboard;
