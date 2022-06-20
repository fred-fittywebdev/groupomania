import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, setCurrentPage } from '../redux/features/postSlice'
import PostTour from '../components/PostTour'
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const { posts, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.post }))
    const dispatch = useDispatch()
    const query = useQuery()
    const searchQuery = query.get("searchQuery")
    const location = useLocation()

    useEffect(() => {
        dispatch(getPosts(currentPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '1000px', alignContent: 'center' }}>
            <MDBRow className='mt-5'>
                {posts.length === 0 && location.pathname === '/' && (
                    <MDBTypography className='text-center mb-0' tag="h2">
                        Aucun post à afficher !
                    </MDBTypography>
                )}
                {posts.length === 0 && location.pathname !== "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        Nous ne trouvons pas de correspondance pour votre recherche.
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {posts && posts.map((item) => (
                                <PostTour key={item._id} {...item} />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {posts.length > 0 && !searchQuery && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    dispatch={dispatch}
                />
            )}
        </div>
    )
}

export default Home