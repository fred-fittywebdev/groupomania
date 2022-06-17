import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBIcon, MDBInput, MDBValidationItem } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import Filebase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/features/postSlice'

const initialState = {
    title: '',
    content: '',
    tags: [],
}

const AddEditPost = () => {
    const [postData, setPostdata] = useState(initialState)
    const [tagErrMsg, setTagErrMsg] = useState(null)
    const { error, loading, userPosts } = useSelector((state) => ({ ...state.post }))
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { title, content, tags } = postData
    const { id } = useParams() // je récupère l'id du post à modifier

    useEffect(() => {
        if (id) {
            const singlePost = userPosts.find((post) => post._id === id)
            setPostdata({ ...singlePost })
        }
    }, [id])

    useEffect(() => {
        error && toast.error(error)
    }, [error])


    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tags.length) {
            setTagErrMsg('Veuillez choisir un tag svp !')
        }
        if (title && content && tags) {
            const updatedPostData = { ...postData, name: user?.result?.name }

            if (!id) {
                dispatch(createPost({ updatedPostData, navigate, toast }))
            } else {
                dispatch(updatePost({ id, updatedPostData, toast, navigate }))
            }
            handleClear()
        }
    }
    // Récupération des valeurs des imputs
    const onInputChange = (e) => {
        const { name, value } = e.target
        setPostdata({ ...postData, [name]: value })
    }

    // Ajout et suppression d'un tag
    const handleAddTag = (tag) => {
        setTagErrMsg(null)
        setPostdata({ ...postData, tags: [...postData.tags, tag] })
    }
    const handleDeleteTag = (deleteTag) => {
        setPostdata({ ...postData, tags: postData.tags.filter((tag) => tag !== deleteTag) })
    }

    const handleClear = () => {
        setPostdata({ title: '', content: '', tags: [] })
    }


    // Suppression des données avant de modifer ou de poster



    return (
        <div className="container" style={{ margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px', }}>
            <MDBCard alignment='center'>
                <h5>{id ? 'Modifier le post' : 'Ajouter un post'}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <MDBValidationItem className="col-md-12" feedback='Veuillez entrer un titre' invalid>
                            <div className="col-md-12">
                                <MDBInput
                                    placeholder='Titre'
                                    type='text'
                                    value={title}
                                    name='title'
                                    className="form-control"
                                    onChange={onInputChange}
                                    required
                                    label='Titre'
                                />
                            </div>
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback='Un post ne peut pas être sans message 😜 !' invalid>
                            <div className="col-md-12">
                                <MDBInput
                                    placeholder='Message'
                                    type='text'
                                    value={content}
                                    name='content'
                                    className="form-control"
                                    onChange={onInputChange}
                                    textarea
                                    rows={4}
                                    required
                                    label='Message'
                                />
                            </div>
                            <div className="col-md-12 mt-5 mb-3">
                                <ChipInput
                                    name='tags'
                                    variant='outlined'
                                    placeholder='Entrez un ou plusieurs tags'
                                    fullWidth
                                    value={tags}
                                    onAdd={(tag) => handleAddTag(tag)}
                                    onDelete={(tag) => handleDeleteTag(tag)}
                                />
                                {tagErrMsg && (
                                    <div className="tagErrMsg">{tagErrMsg}</div>
                                )}
                            </div>
                            <div className="d-flex justify-content-start my-2">
                                <Filebase type='file' multiple={false} onDone={({ base64 }) => setPostdata({ ...postData, imageFile: base64 })} />
                            </div>
                            {postData.imageFile && (
                                <div className="preview_wrapper">
                                    <MDBIcon className='close_preview' fas icon='times' onClick={() => setPostdata({ ...postData, imageFile: '' })} />
                                    <img className='image_preview' src={postData.imageFile} alt="Illustration du message" />
                                </div>
                            )}
                            <div className="col-12">
                                <MDBBtn className='btn_post'>{id ? "Modifier" : "Poster"}</MDBBtn>
                                <MDBBtn onClick={handleClear} className='btn_clear mt-2'>Effacer</MDBBtn>
                            </div>
                        </MDBValidationItem>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
export default AddEditPost