import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { excerpt } from '../utility'

const PostTour = ({ imageFile, title, content, tags, _id, name }) => {


    return (
        <MDBCardGroup>

            <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
                {imageFile && (
                    <MDBCardImage src={imageFile} alt={title} position='top' style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'cover' }} />
                )}
                <div className="info_wrapper">
                    <div className="top_left">{name}</div>
                    <span className="text-start">{tags.map((tag) => (
                        <Link className='tag_card' to={`/posts/tag/${tag}`}> #{tag}</Link>
                    ))}</span>
                </div>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                    <MDBCardText className='text-start'>{excerpt(content, 45)}
                        <Link to={`/post/${_id}`}>soyez curieux !</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default PostTour