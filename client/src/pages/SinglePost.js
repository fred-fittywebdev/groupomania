import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../redux/features/postSlice'
import moment from 'moment'
import 'moment/locale/fr'

const SinglePost = () => {
    const dispatch = useDispatch()
    const { post } = useSelector((state) => ({ ...state.tour }))
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getPost(id))
            console.log(id)
        }
    }, [id])

    return (
        <>
            <MDBContainer>
                <MDBCard className="mb-3 mt-2">
                    <MDBCardImage
                        position='top'
                        style={{ width: '100%', maxHeight: '600px' }}
                        src={post?.imageFile}
                        alt={post?.title}
                    />
                    {post?.name}
                    <MDBCardBody>
                        <h3>{post?.title}</h3>
                        <span>
                            <p className="text-start postname">Auteur: {post?.name}</p>
                        </span>
                        <div style={{ float: 'left' }}>
                            <span className="text-start">
                                {post?.tags.map((item) => `#${item} `)}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className="text-start mt-2">
                            <MDBIcon style={{ float: 'left', margin: '5px' }} far icon='calendar-alt' size='lg'>
                            </MDBIcon>
                            <small className="text-muted">
                                {moment(post?.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>
                            {post?.content}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    )
}

export default SinglePost