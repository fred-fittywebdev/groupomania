import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBRow, MDBCol, MDBCardBody, MDBCard, MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { getUserProfile, updateUserProfile } from '../redux/features/profileSlice'
import { setProfile } from '../redux/features/authSlice'

const Profile = () => {
    //Modification du profil
    const [editMode, setEditMode] = useState(false)
    const [info, setInfo] = useState({})

    const { id } = useParams()
    const dispatch = useDispatch()
    const { userDetail } = useSelector((state) => ({ ...state.profile }))

    useEffect(() => {
        if (id) {
            dispatch(getUserProfile(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleEdit = () => {
        setEditMode(true)
        setInfo({ ...userDetail })
    }
    const handleSave = () => {
        if (!info.name || !info.occupation) {
            return toast.error('Veuillez remplir tous les champs du formulaire')
        }
        dispatch(updateUserProfile({ id, info }))
        dispatch(setProfile(info))
        setEditMode(false)
        dispatch(getUserProfile(id))
        toast.success('profil modifié avec success')
    }
    const handleCancel = () => {
        setEditMode(false)
        setInfo({})
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '1000px', alignContent: 'center', marginTop: '20px' }}>
            <MDBRow className="mt-5 row-cols-1 row-cols-md-3 g-4" style={{ marginTop: '50px' }}>
                <MDBCol>
                    <MDBCard style={{ width: '18rem' }} className="d-sm-flex">
                        <img src={userDetail?.imageFile ? userDetail.imageFile : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt={userDetail?.name}
                            style={{
                                borderRadius: '50%',
                                height: "250px",
                                width: '250px',
                                margin: 'auto',
                                display: 'block'
                            }}
                        />
                        <h5 className="mt-4">{userDetail?.name}</h5>
                        <p className="mb-1 info">{userDetail?.occupation}</p>
                    </MDBCard>
                </MDBCol>
                <MDBCol>
                    <MDBCard style={{ width: '38rem' }} className="mb-3" >
                        {editMode && (
                            <div className="align-item-center">
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setInfo({ ...info, imageFile: base64 })} />
                            </div>
                        )}
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <h6 className="mb-0 text-start mt-1">Nom et Prénom</h6>
                                </MDBCol>
                                <MDBCol sm="9">
                                    {editMode ? (
                                        <MDBInput value={info?.name} name='name' onChange={handleChange}></MDBInput>
                                    ) : (
                                        <p className="text-start lead info">{userDetail?.name}</p>
                                    )}
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <h6 className="mb-0 text-start mt-1">Adresse mail</h6>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <p className="text-start lead info">{userDetail?.email}</p>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <h6 className="mb-0 text-start mt-1">Poste occupé</h6>
                                </MDBCol>
                                <MDBCol sm="9">
                                    {editMode ? (
                                        <MDBInput value={info?.occupation} name='occupation' onChange={handleChange}></MDBInput>
                                    ) : (
                                        <p className="text-start lead info">{userDetail?.occupation ? userDetail.occupation : "Aucun poste n'est renseigné"}</p>
                                    )}
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            {!editMode ? (
                                <MDBBtn onClick={handleEdit} className='profile_btn'>Modifier</MDBBtn>
                            ) : (
                                <>
                                    <MDBBtn onClick={handleSave} className='profile_btn_save mx-2'>Sauvegarder</MDBBtn>
                                    <MDBBtn onClick={handleCancel} className='profile_btn_cancel'>Annuler</MDBBtn>
                                </>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Profile