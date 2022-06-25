import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import CommonPost from '../components/CommonPost'

const Category = () => {
    const { totalPostsData, loading } = useSelector((state) => ({ ...state.post }))
    const { category } = useParams()

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ margin: 'auto', padding: '120px', maxWidth: '900px', alignContent: 'center' }}>
            <h3 className="text-center">Catégorie: {category}</h3>
            <hr style={{ maxWidth: '570px' }} />
            {totalPostsData?.filter((item) => item.category === category).map((item) => (
                <CommonPost key={item._id} {...item} />
            ))}
        </div>
    )
}

export default Category