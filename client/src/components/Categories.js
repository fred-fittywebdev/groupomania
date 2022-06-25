import React from 'react'
import { MDBCardTitle, MDBListGroup, MDBBadge, MDBListGroupItem } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const Categories = ({ categoryCount }) => {
    return (
        <>
            <MDBCardTitle className='title text-start mt-2'>Catégories</MDBCardTitle>
            <MDBListGroup style={{ width: '22rem' }}>
                {categoryCount.map((item, index) => (
                    <Link key={index} to={`/posts/category/${item.category}`}>
                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                            {item.category}
                            <MDBBadge pill>{item.count}</MDBBadge>
                        </MDBListGroupItem>
                    </Link>
                ))}
            </MDBListGroup>
        </>
    )
}

export default Categories