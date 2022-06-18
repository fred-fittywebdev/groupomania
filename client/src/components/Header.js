import React, { useState } from 'react'
import { MDBNavbar, MDBContainer, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand, MDBIcon } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'

// Token
import decode from 'jwt-decode'

// image
import groupomania from '../images/icon.svg'
import { searchPosts } from '../redux/features/postSlice'

const Header = () => {
    // Hamburger menu state
    const [show, setShow] = useState(false)
    // search
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state.auth }))
    const token = user?.token

    // Ici je compare le token a l'heure actuelle et si cela fait plus d'une heure de connexion on déconnecte
    if (token) {
        const decodedToken = decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout())
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (search) {
            dispatch(searchPosts(search))
            navigate(`/posts/search?search=${search}`)
            setSearch('')
        } else {
            navigate('/')
        }
    }

    const handleLogout = () => {
        dispatch(setLogout())
    }

    return (
        <MDBNavbar fixed='top' expand='lg' style={{ backgroundColor: '#ffd7d7' }}>
            <MDBContainer>
                <MDBNavbarBrand href='/' style={{ color: '#4E5166', fontWeight: '600', fontSize: '22px' }}>
                    <img className="logo" src={groupomania} alt="Logo du site" />
                    GROUPOMANIA
                </MDBNavbarBrand>
                <MDBNavbarToggler type='button' aria-expanded='false' aria-label='Toggle navigation' onClick={() => setShow(!show)} style={{ color: '#4E5166' }} >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                            <h5 className="user_infos">Bonjour {user?.result?.name}</h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <p className='header-text'>Acceuil</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addPost'>
                                        <p className='header-text'>Ajouter un Post</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className='header-text' onClick={() => handleLogout()}>Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className='header-text'>Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Rechercher'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                            <MDBIcon className='search-icon' onClick={handleSubmit} fas icon='search' />
                        </div>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar >
    )

}
export default Header