import React, { useEffect } from 'react'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup } from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getPostsByUser, deletePost } from '../redux/features/postSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { excerpt } from '../utility'

const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state.auth }))
    const { userPosts, loading } = useSelector((state) => ({ ...state.post }))
    const userId = user?.result?._id
    // To grab the pathname to retreive in AddEditPost to populate data on update
    const { pathname } = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(getPostsByUser(userId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])


    if (loading) {
        return <Spinner />
    }

    const handleDelete = (id) => {
        if (window.confirm('Etes vous sur de vouloir supprimer ce post?')) {
            dispatch(deletePost({ id, toast }))
        }
    }


    return (
        <div style={{ margin: 'auto', padding: '120px', maxWidth: '900px', alignContent: 'center' }}>
            {userPosts.length === 0 && (
                <h4>Bonjour {user?.result?.name} vous n'avez pas encore de post</h4>
            )}
            {userPosts.length > 0 && (
                <h4 className="text-center">Tableau de bord: {user?.result?.name} </h4>
            )}
            <hr style={{ maxWidth: '570px' }} />
            {userPosts && userPosts.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: '600px' }} className='mt-2'>
                        <MDBRow className='g-0 p-2'>
                            <MDBCol md='4'>
                                {item.imageFile && (
                                    <MDBCardImage
                                        className='rounded'
                                        src={item.imageFile}
                                        alt={item.title}
                                        fluid
                                    />
                                )}
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className="text-muted">
                                            {excerpt(item.content, 35)}
                                        </small>
                                    </MDBCardText>
                                    <div style={{ marginLeft: '5px', float: 'right', marginTop: '-60px' }}>
                                        <MDBBtn className='mt-1' tag='a' color='none'>
                                            <MDBIcon
                                                fas
                                                icon='trash'
                                                style={{ color: '#fd2d01' }}
                                                size='lg'
                                                onClick={() => handleDelete(item._id)}
                                            />
                                        </MDBBtn>
                                        <Link to={`/editPost/${item._id}`} state={{ previousPath: pathname }}>
                                            {console.log(pathname)}
                                            <MDBIcon
                                                fas
                                                icon='edit'
                                                style={{ color: '#01d1fd ', marginLeft: '10px' }}
                                                size='lg'
                                            />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default Dashboard