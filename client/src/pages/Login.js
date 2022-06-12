import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBInput, MDBValidationItem } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../redux/features/authSlice'
import { GoogleLogin } from "react-google-login"


const initialState = {
    email: '',
    passwsord: '',
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState)
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password } = formValue
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const HandleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(login({
                formValue,
                navigate,
                toast
            }))
        }
    }
    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const googleSuccess = (response) => {
        console.log(response)
    }
    const googleFailure = (error) => {
        toast.error(error)
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px', }}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Connexion</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={HandleSubmit} noValidate className='row g-3'>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer votre adresse mail' invalid>
                            <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer votre mot de passe' invalid>
                            <MDBInput label="Mot de passe" type="password" value={password} name="password" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{ width: '100%' }}>
                                {loading && (
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                )}
                                Connexion
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br></br>
                    <GoogleLogin
                        clientId='209682645012-9a9p034v432q04atrmlpftfg6hciofcr.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: '100%' }}
                                color='danger'
                                onClick={(renderProps.onClick)}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className='me-2' fab icon='google' /> S'inscrire avec Google
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/register'>
                        <p>Pas encore de compte? Inscrivez-vous.</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div >
    )
}

export default Login