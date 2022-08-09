import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { excerpt } from '../utility'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, deletePost } from '../redux/features/postSlice'
import Badge from './Badge'
import { toast } from 'react-toastify'

const PostTour = ({ imageFile, title, content, tags, _id, name, likes, socket, creator, category, }) => {
    const { user } = useSelector((state) => ({ ...state.auth }))
    const userId = user?.result?._id // on récupère l'id du userId
    const dispatch = useDispatch()

    const Likes = () => {
        if (likes && likes.length) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon='thumbs-up' />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip tag='span' title={`Vous et ${likes.length - 1} autres personnes ont aimé ce post`}>
                            {likes.length} likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} like${likes.length > 1 ? 's' : ''}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon='thumbs-up' />
                    &nbsp;{likes.length} {likes.length === 1 ? 'like' : 'likes'}
                </>
            )
        }
        return (
            <>
                <MDBIcon far icon='thumbs-up' />
                &nbsp;Like
            </>
        )

    }

    const handleLike = () => {
        dispatch(likePost({ _id }))
        const alreadyLiked = likes.find((like) => like === userId)
        if (!alreadyLiked && userId !== creator) {
            socket.emit("sendNotification", {
                senderName: user?.result?.name,
                receiverName: name
            })
        }
    }

    const handleDelete = (id) => {
        if (window.confirm('Etes vous sur de vouloir supprimer ce post?')) {
            dispatch(deletePost({ id, toast }))
        }
    }


    return (
        <MDBCardGroup>

            <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
                {imageFile && (
                    <MDBCardImage src={imageFile} alt={title} position='top' style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'cover' }} />
                )}
                <Badge>{category}</Badge>
                <div className="info_wrapper">
                    <div className="top_left">{name}

                        <MDBBtn className="btn-like" tag='p' color='none' onClick={!user?.result ? null : handleLike}>
                            {!user?.result ? (
                                <MDBTooltip tag="span" title="Veuillez vous connecter pour intéragir avec vos collègues">
                                    <Likes />
                                </MDBTooltip>
                            ) : (
                                <Likes />
                            )}
                        </MDBBtn>
                    </div>
                    <span className="text-start">{tags.map((tag, index) => (
                        <Link key={index} className='tag_card' to={`/posts/tag/${tag}`}> #{tag}</Link>
                    ))}</span>
                </div>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                    <MDBCardText className='text-start'>{excerpt(content, 45)}
                        <Link to={`/post/${_id}`}>soyez curieux !</Link>
                    </MDBCardText>
                    <div className="admin_actions">
                        {user?.result && user?.result?.role === 'admin' && (
                            <div>
                                <MDBBtn className='mt-1 delete_btn' tag='span' color='none'>
                                    <MDBIcon
                                        fas
                                        icon='trash'
                                        style={{ color: '#fd2d01' }}
                                        size='lg'
                                        onClick={() => handleDelete(_id)}
                                    />
                                </MDBBtn>
                            </div>
                        )}
                        {user?.result && user?.result?.role === 'admin' && (
                            <Link to={`/editPost/${_id}`}>
                                <MDBIcon
                                    fas
                                    icon='edit'
                                    style={{ color: '#01d1fd ', marginLeft: '10px' }}
                                    size='lg'
                                />
                            </Link>
                        )}
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup >
    )
}

export default PostTour