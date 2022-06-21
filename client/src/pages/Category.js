import React from 'react'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup } from 'mdb-react-ui-kit'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { excerpt } from '../utility'
import Spinner from '../components/Spinner'

const Category = () => {
    const { totalPostsData, loading } = useSelector((state) => ({ ...state.post }))
    const { category } = useParams()
    const navigate = useNavigate()

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ margin: 'auto', padding: '120px', maxWidth: '900px', alignContent: 'center' }}>
            <h3 className="text-center">Catégorie: {category}</h3>
            <hr style={{ maxWidth: '570px' }} />
            {totalPostsData?.filter((item) => item.category === category).map((item) => (
                <MDBCard style={{ maxWidth: "600px" }} className="mt-2 p-1">
                    <MDBRow className="g-0">
                        <MDBCol md="4">
                            <MDBCardImage
                                className="rounded"
                                src={item.imageFile}
                                alt={item.title}
                                fluid
                            />
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBCardBody>
                                <MDBCardTitle className="text-start">
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className="text-start">
                                    {excerpt(item.content, 40)}
                                </MDBCardText>
                                <div style={{ float: "left", marginTop: "-10px" }}>
                                    <MDBBtn
                                        className="tagPost_btn my-2"
                                        size="sm"
                                        color="info"
                                        onClick={() => navigate(`/post/${item._id}`)}
                                    >
                                        Voir plus
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>

            ))}
        </div>
    )
}

export default Category