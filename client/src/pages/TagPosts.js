import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByTag } from "../redux/features/postSlice";
import { excerpt } from "../utility";

const TagPosts = () => {
    const { tagPosts, loading } = useSelector((state) => ({ ...state.post }))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { tag } = useParams()

    useEffect(() => {
        if (tag) {
            dispatch(getPostsByTag(tag))
        }
    }, [tag])

    if (loading) {
        return <Spinner />;
    }


    return (
        <div
            style={{
                margin: "auto",
                padding: "120px",
                maxWidth: "900px",
                alignContent: "center",
            }}
        >
            <h3 className="text-center">Posts avec le tag: {tag}</h3>
            <hr style={{ maxWidth: "570px" }} />
            {tagPosts &&
                tagPosts.map((item) => (
                    <MDBCardGroup key={item._id}>
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
                    </MDBCardGroup>
                ))}
        </div>
    )
}

export default TagPosts