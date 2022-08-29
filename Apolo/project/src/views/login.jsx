import React, { useRef, useState, useContext } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { countContext } from '../App';
import axios from "axios";
function LogIn() {
    const navigate = useNavigate();
    const countCountext = useContext(countContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        //const params = {username:emailRef.current.value,password:passwordRef.current.value}
        await axios.get(`http://localhost:5000/admin/adminLogin/${emailRef.current.value}/${passwordRef.current.value}`)
            .then((response) => {
                if (response.statusText === 'OK' && response.status === 200) {
                    countCountext.countDispatch({
                        type: 'ADD_TO_BASKET',
                        item: {
                            value: true
                        },
                    })
                    navigate('/Admin', { replace: true })
                }
            })
            .catch((err) => {
                setError('Invalid data')
                alert('Invalid Data')
            })
        setLoading(false)
    }
    return (
        <div className='center'>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form.Group id='email'>
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type='text' required ref={emailRef}
                                onKeyPress={(event) => {
                                    if (/^[A-Za-z]\w{7,14}$/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' required ref={passwordRef}></Form.Control>
                        </Form.Group><br />

                        <Button disabled={loading} type='submit'>LOG IN</Button>

                    </Form>
                </Card.Body>
                <div className='w-100 text-center mt-2'>
                    <Link to='/SignUp'>Back to Book Appointment</Link>
                </div>
            </Card>
        </div>
    )
}

export default LogIn