import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/features/postSlice'
import PostTour from '../components/PostTour'
import Spinner from '../components/Spinner'

const Home = () => {
    const { posts, loading } = useSelector((state) => ({ ...state.post }))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '1000px', alignContent: 'center' }}>
            <MDBRow className='mt-5'>
                {posts.length === 0 && (
                    <MDBTypography className='text-center mb-0' tag="h2">
                        Aucun post à afficher !
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {posts && posts.map((item, index) => (
                                <PostTour key={index} {...item} />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default Home