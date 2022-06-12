import React, { useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBInput, MDBValidationItem } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const initialState = {
    email: '',
    passwsord: '',
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState)
    const { email, password } = formValue

    const HandleSubmit = (e) => {
        e.preventDefault()
    }
    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px', }}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Connexion</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={HandleSubmit} noValidate className='row g-3'>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer une adresse mail' invalid>
                            <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer une adresse mail' invalid>
                            <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange} required invalid validation='Veuillez entrer une mot de passe" />' />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{ width: '100%' }}>
                                Connexion
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/register'>
                        <p>Pas encore de compte? Inscrivez-vous.</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login