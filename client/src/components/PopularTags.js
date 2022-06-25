import React from 'react'
import { MDBCardTitle } from 'mdb-react-ui-kit'
import { NavLink } from 'react-router-dom'

const PopularTags = ({ totalTags }) => {
    return (
        <>
            <MDBCardTitle className='title text-start' >Vous aimez</MDBCardTitle>
            <div className="tag-label text-start">
                <ul>
                    {totalTags.map((tag, index) => (
                        <li key={index} color='info' className='m-1 tag'>
                            <NavLink to={`posts/tag/${tag}`} style={{ color: '#4E5166' }}>
                                {tag}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PopularTags