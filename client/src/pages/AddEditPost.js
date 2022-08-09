import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBIcon, MDBInput, MDBValidationItem } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import Filebase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/features/postSlice'

const initialState = {
    title: '',
    content: '',
    category: '',
    tags: [],
}

const categoryOptions = ['RH', 'Loisirs', 'Teambuilding', 'Voyages', 'Evenements']

const AddEditPost = () => {
    const [postData, setPostdata] = useState(initialState)
    const [tagErrMsg, setTagErrMsg] = useState(null)
    const [categoryErrMsg, setCategoryErrMsg] = useState(null)
    const { error, userPosts, posts } = useSelector((state) => ({ ...state.post }))
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Retreive the previous location pathname here
    const { state } = useLocation();

    const { title, content, tags, category } = postData
    const { id } = useParams() // je récupère l'id du post à modifier

    // Here we grab the previous location pathname and make a condition, to allow populate data depending witch page we came from, dashboard or home.
    // Depending on that pathname we assign posts or userPosts to singlePosts variable.
    useEffect(() => {
        if (id) {
            if (state?.previousPath === "/dashboard") {
                const singlePost = userPosts.find((post) => post._id === id)
                setPostdata({ ...singlePost })
            } else {
                const singlePost = posts.find((post) => post._id === id)
                setPostdata({ ...singlePost })
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        error && toast.error(error)
    }, [error])


    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!category) {
            setCategoryErrMsg("Veuillez choisir une catégorie")
        }
        if (!tags.length) {
            setTagErrMsg('Veuillez choisir un tag svp !')
        }
        if (title && content && tags && category) {
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

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null)
        setPostdata({ ...postData, category: e.target.value })
    }


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
                            <div className='col-md-12'>
                                <select className='category_dropdown mt-3' onChange={onCategoryChange} value={category}>
                                    <option>Choisissez une catégorie</option>
                                    {categoryOptions.map((option, index) => (
                                        <option value={option || ''} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {setCategoryErrMsg && (
                                    <div className='category_error_message'>{categoryErrMsg}</div>
                                )}
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
                    <p>Previous route: {state?.previousPath || "undefined"}</p>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
export default AddEditPost