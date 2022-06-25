import React from 'react'
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
import { excerpt } from "../utility";
import { useNavigate } from "react-router-dom";

const CommonPost = ({ title, content, imageFile, _id }) => {
    const navigate = useNavigate()

    return (
        <MDBCardGroup>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2 p-1">
                <MDBRow className="g-0">
                    <MDBCol md="4">
                        <MDBCardImage
                            className="rounded"
                            src={imageFile}
                            alt={title}
                            fluid
                        />
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBCardTitle className="text-start">
                                {title}
                            </MDBCardTitle>
                            <MDBCardText className="text-start">
                                {excerpt(content, 40)}
                            </MDBCardText>
                            <div style={{ float: "left", marginTop: "-10px" }}>
                                <MDBBtn
                                    className="tagPost_btn my-2"
                                    size="sm"
                                    color="info"
                                    onClick={() => navigate(`/post/${_id}`)}
                                >
                                    Voir plus
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default CommonPost