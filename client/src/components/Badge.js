import React from 'react'
import { MDBBadge } from 'mdb-react-ui-kit'

const Badge = ({ children, styleInfo }) => {
    const colorKey = {
        RH: "primary",
        Loisirs: 'secondary',
        Teambuilding: 'danger',
        Voyages: 'warning',
        Evenements: 'info',
    }
    return (
        <h5 className='badge_custom' style={styleInfo}>
            <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
        </h5>
    )
}

export default Badge