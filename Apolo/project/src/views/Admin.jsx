import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/admin.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Adminform from './Adminform';
import axios from "axios";
import { Link } from 'react-router-dom';
const Admin = () => {
    const [sendData, setSend] = useState(null);
    const [edit, setEdit] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const [table, setTable] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:5000/admin/')
            .then((response) => {
                const result = response.data;
                setData(result)
                if (Object.keys(response.data).length === 0) {
                    setTable(false)
                } else {
                    setTable(true)
                }
            })
            .catch((err) => {
                alert(err, 'Data not received')
            })
    }, [])
    const deleteData = (id) => {
        {
            if (window.confirm(`Delete Confirmation.Once Delete Can't Retrieve the Data.`) === true) {
                axios.post('http://localhost:5000/admin/delete', {
                    doc_id: id
                }).then(response => console.log(response.status, response))
                    .catch(error => console.log(error));
            }
        }
    }
    const getDay = (day) => {
        let val = ''
        day.forEach(element => {
            if (element.isChecked === true) {
                //console.log(element.name)
                val = element.name + ' ' + val
            }
        });
        return val
    }
    return (
        <div className='container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the New Record</Modal.Title>
                </Modal.Header>
                {edit ? <Modal.Body><Adminform data={sendData} flag={false} /></Modal.Body> : <Modal.Body><Adminform flag={true} /></Modal.Body>}
                {/* <Modal.Body><Adminform data={sendData} /></Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Doctor Number</th>
                        <th scope="col">Hospital Name</th>
                        <th scope="col">Hospital location</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Date</th>
                        <th scope='col'>Action</th>
                        <th scope='col'>
                            <div><Link to='/Login' replace={true} >logout</Link></div>
                            <div><button className='addbutton'
                                onClick={() => { handleShow(); setEdit(false) }}
                            ><ion-icon name="add-sharp"></ion-icon></button></div>
                        </th>
                    </tr>
                </thead>
                {table && <tbody>
                    {data.map((item) =>
                        <tr key={item.doc_id}>
                            <td>{item.doc_id}</td>
                            <td>{item.doc_name}</td>
                            <td>{item.doc_number}</td>
                            <td>{item.hosp_name}</td>
                            <td>{item.hosp_location}</td>
                            <td>{item.spec_name}</td>
                            <td>{getDay(item.date)}
                            </td>
                            <td>
                                <div className='row'>
                                    <span className='col-2'><Button className='edit' variant='warning' onClick={() => { setSend(item); handleShow(); setEdit(true) }}><ion-icon name="pencil-sharp"></ion-icon></Button></span>
                                    <span className='offset-3 col-2'><Button className='delete' variant='danger' onClick={() => { deleteData(item.doc_id) }}><ion-icon name="trash-bin-sharp"></ion-icon></Button></span>
                                </div>
                            </td>
                        </tr>)}
                </tbody>}
            </table>
        </div>
    );
}
export default Admin