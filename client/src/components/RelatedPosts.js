import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const RelatedPosts = ({ relatedPosts, postId }) => {
    return (
        <>
            {relatedPosts.length > 1 && <h4 className='related-title'>Ces posts pourraient vous plaire</h4>}
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {relatedPosts
                    .filter((item) => item._id !== postId)
                    .splice(0, 3)
                    .map((item) => (
                        <MDBCol>
                            <MDBCard>
                                <Link to={`/post/${item._id}`}>
                                    <MDBCardImage
                                        src={item.imageFile}
                                        alt={item.title}
                                        position="top"
                                    />
                                </Link>
                                <span className="text-start tag_card-related">
                                    {item.tags.map((tag) => (
                                        <Link className="tag_card" to={`/posts/tag/${tag}`}> #{tag}</Link>
                                    ))}
                                </span>
                                <MDBCardBody>
                                    <MDBCardTitle className="text-start">
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className="text-start">
                                        {excerpt(item.content, 45)}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
            </MDBRow>
        </>
    )
}

export default RelatedPosts