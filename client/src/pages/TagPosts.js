import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByTag } from "../redux/features/postSlice";
import CommonPost from "../components/CommonPost";

const TagPosts = () => {
    const { tagPosts, loading } = useSelector((state) => ({ ...state.post }))
    const dispatch = useDispatch()
    const { tag } = useParams()

    useEffect(() => {
        if (tag) {
            dispatch(getPostsByTag(tag))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <CommonPost key={item._id} {...item} />
                ))}
        </div>
    )
}

export default TagPosts