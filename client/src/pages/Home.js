import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTags, getPosts, setCurrentPage } from '../redux/features/postSlice'
import PostTour from '../components/PostTour'
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'
import { useLocation, useNavigate } from "react-router-dom";
import PopularTags from '../components/PopularTags'
import Categories from '../components/Categories'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = ({ socket }) => {
    const { posts, loading, currentPage, numberOfPages, totalTags, totalPostsData } = useSelector((state) => ({ ...state.post }))
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const searchQuery = query.get("searchQuery")
    const location = useLocation()

    const counts = totalPostsData.reduce((prevValue, currentValue) => {
        let name = currentValue.category
        if (!prevValue.hasOwnProperty(name)) {
            prevValue[name] = 0
        }
        prevValue[name]++
        delete prevValue["undefined"]
        return prevValue
    }, {})

    const categoryCount = Object.keys(counts).map((k) => {
        return {
            category: k,
            count: counts[k]
        }
    })

    const checkScreenSize = () => {
        if (window.innerWidth < 950) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", checkScreenSize)

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        }
    }, [])

    useEffect(() => {
        dispatch(getAllTags())
    }, [])

    useEffect(() => {
        dispatch(getPosts(currentPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ margin: 'auto', padding: '15px', maxWidth: '1400px', alignContent: 'center' }}>
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
                                <PostTour key={item._id} socket={socket} {...item} />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                {!visible && (
                    <MDBCol size={3} className='mt-4'>
                        <PopularTags totalTags={totalTags} />
                        <Categories categoryCount={categoryCount} />
                    </MDBCol>
                )}
                {visible && (
                    <div className="mt-4">
                        <PopularTags totalTags={totalTags} />
                        <Categories categoryCount={categoryCount} />
                    </div>
                )}
                <div className="mt-4">
                    {posts.length > 0 && !searchQuery && (
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            dispatch={dispatch}
                        />
                    )}
                </div>

            </MDBRow>
        </div>
    )
}

export default Home