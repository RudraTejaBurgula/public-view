import React, { useRef, useState, useContext } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../functions/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier } from "../firebase";
import { countContext } from '../App';
import '../styles/signUp.css'
function SignUp() {
    const nameRef = useRef();
    const countCountext = useContext(countContext);
    const mobileRef = useRef();
    const otpRef = useRef();
    const auth = getAuth();
    const { signNumber } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const [otpvisible, setOtpVisible] = useState(true);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            const code = otpRef.current.value;
            window.confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                //console.log(result);
                countCountext.countDispatch({
                    type: 'ADD_TO_BASKET',
                    item: {
                        name: nameRef.current.value,
                        mobile: mobileRef.current.value
                    },
                })
                navigate('/Dashboard', { replace: true })
            }).catch((error) => {
                alert('Re-try again!')
                console.log(error.message)
            });
        } catch {
            setError('Failed to Sign Up')
        }
        setLoading(false)
    }
    function getOtp() {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
            }
        }, auth);
    }
    async function onSignInSubmit(e) {
        e.preventDefault();
        setVisible(true)
        setOtpVisible(false)
        getOtp();
        const phoneNumber = "+91" + mobileRef.current.value;
        const appVerifier = window.recaptchaVerifier;
        await signNumber(auth, phoneNumber, appVerifier)
        setLoading(false)
    }
    const notNull = (e) => {
        if (e.target.value.length === 10) {
            console.log(e.target.value.length)
            setVisible(false)
        }
        else { setVisible(true); setOtpVisible(true); setLoading(true) }
    }
    return (
        <div className='outer' autoComplete='off'>
            <Card className='center' autoComplete='off'>
                <Card.Body>
                    <h2>Sign Up</h2>
                    <Form onSubmit={handleSubmit} method='POST' autoComplete='off'>
                        <div id='sign-in-button'></div>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form.Group id='name'>
                            <Form.Label>Enter Your Name:</Form.Label>
                            <Form.Control required ref={nameRef} autoComplete='off'></Form.Control>
                        </Form.Group>
                        <Form.Group id='mobile-number'>
                            <Form.Label>Enter Your Mobile Number:</Form.Label>
                            <Form.Control autoComplete='off' type='number' name='mobile' required ref={mobileRef} onChange={e => notNull(e)}></Form.Control><br />
                        </Form.Group>
                        <Button onClick={onSignInSubmit} disabled={visible}>Get OTP</Button><br />
                        <Form.Group>
                            <Form.Label disabled={visible}>Enter Your OTP:</Form.Label><br />
                            <Form.Control autoComplete='off' disabled={otpvisible} type='number' name='opt' required ref={otpRef}></Form.Control><br />
                        </Form.Group>
                        <Button disabled={loading} type='submit'>SIGN IN</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/Login'>Doctor Login</Link>
            </div>
        </div>
    )
}
export default SignUp