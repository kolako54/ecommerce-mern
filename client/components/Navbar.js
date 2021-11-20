import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookies from 'js-cookie';

export default function Navbar() {
    const router = useRouter();
    const { state, dispatch } = useContext(DataContext);
    const { auth, card } = state
    console.log(card);
    console.log(auth);
    const isActive = (r) => {
        if (r === router.pathname) return " active"
        else return ""

    }
    const handleLogout = () => {
        Cookies.remove('refreshToken', { path: 'api/auth/accessToken' });
        localStorage.removeItem('firstLogin');
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
    }
    const loggedRouter = () => {
        return (<li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={auth.user.avatar} alt={auth.user.name} style={{ borderRadius: '50%', width: '30px', height: '30px', transform: 'translateY(-3px)', marginRight: '3px' }} />
                {auth.user.name}
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" onClick={handleLogout}>Logout</a>
            </div>
        </li>)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">D E V _ W I T H _ E L I O</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav p-1">
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')}>
                                <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                                    <span className="position-absolute" style={{ padding: '3px 6px', background: '#ed143dc2', top: '-10px', right: '-10px', color: 'white', fontSize: '14px', borderRadius: '50%' }}>{card.length}</span>
                                </i>Cart
                            </a>
                        </Link>
                    </li>
                    {Object.keys(auth).length === 0 ? (
                        <li className="nav-item">
                            <Link href="/signin">
                                <a className={"nav-link" + isActive('/signin')}> <i className="fas fa-user" aria-hidden="true"></i>Sign in</a>
                            </Link>
                        </li>) : loggedRouter()
                    }
                </ul>
            </div>
        </nav>
    )
}
