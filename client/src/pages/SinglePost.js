import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost, getRelatedPosts } from '../redux/features/postSlice'
import moment from 'moment'
import 'moment/locale/fr'
import RelatedPosts from '../components/RelatedPosts'

const SinglePost = () => {
    const dispatch = useDispatch()
    const { post, relatedPosts } = useSelector((state) => ({ ...state.post }))
    const { id } = useParams()
    const tags = post?.tags

    useEffect(() => {
        tags && dispatch(getRelatedPosts(tags))
    }, [tags])

    useEffect(() => {
        if (id) {
            dispatch(getPost(id))
            console.log(id)
        }
    }, [id])

    return (
        <>
            <MDBContainer style={{ marginTop: '100px' }}>
                <MDBCard className="mb-3 mt-2">
                    <MDBCardImage
                        position='top'
                        style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
                        src={post?.imageFile}
                        alt={post?.title}
                    />
                    <MDBCardBody>
                        <h3>{post?.title}</h3>
                        <span>
                            <p className="text-start postname">Auteur: {post?.name}</p>
                        </span>
                        <div style={{ float: 'left' }}>
                            <span style={{ color: '#fd2d01' }} className="text-start">
                                {post && post.tags && post?.tags.map((item) => `#${item} `)}
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
                        <hr />
                        <MDBCardText className='lead mb-0 text-start'>
                            {post?.content}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedPosts relatedPosts={relatedPosts} postId={id} />
                </MDBCard>
            </MDBContainer>
        </>
    )
}

export default SinglePost