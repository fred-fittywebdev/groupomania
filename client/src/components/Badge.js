import React from 'react'
import { MDBBadge } from 'mdb-react-ui-kit'

const Badge = ({ children, styleInfo }) => {
    const colorKey = {
        RH: "#fdab01",
        Loisirs: '#fd0153',
        Teambuilding: '#01fd2d',
        Voyages: '#2d01fd',
        Evenements: '#01d1fd',
    }
    return (
        <h5 style={styleInfo}>
            <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
        </h5>
    )
}

export default Badge