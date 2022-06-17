import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        // Ici je crée un compteur qui  au bout de 5 sec nous redirigeras vers la home si on est pas authentifié
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    }, [count, navigate])


    return (
        <div style={{ marginTop: '200px' }}>Vous serez redirigé dans {count} secondes.</div>
    )
}

export default Redirect