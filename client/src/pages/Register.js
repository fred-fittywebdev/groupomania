import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBInput, MDBValidationItem } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register } from '../redux/features/authSlice'


const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    passwsord: '',
    confirmPassword: '',
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState)
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password, firstname, lastname, confirmPassword } = formValue
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const HandleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return toast.error('Les mots de passes de sont pas identiques.')
        }
        if (email && password && firstname && lastname && confirmPassword) {
            dispatch(register({
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

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px', }}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Inscription</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={HandleSubmit} noValidate className='row g-3'>
                        <MDBValidationItem className="col-md-6" feedback='Veuillez entrer votre prénom' invalid>
                            <MDBInput label="Prénom" type="text" value={firstname} name="firstname" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-6" feedback='Veuillez entrer votre nom' invalid>
                            <MDBInput label="Nom" type="nom" value={lastname} name="lastname" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer votre adresse mail' invalid>
                            <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer votre mot de passe' invalid>
                            <MDBInput label="Mot de passe" type="password" value={password} name="password" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez confirmer votre mot de passe' invalid>
                            <MDBInput label="Confirmez votre mot de passe" type="password" value={confirmPassword} name="confirmPassword" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn className='login_btn'>
                                {loading && (
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                )}
                                Inscription
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link style={{ color: '#fd2d01' }} to='/login'>
                        <p>Vous avez déjà un compte? connectez-vous.</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Register