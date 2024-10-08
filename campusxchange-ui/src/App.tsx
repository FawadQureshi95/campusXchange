import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ToastConfiguration from './config/ToastConfiguration'
import Test from './components/Test'
import IUser from './type/user'

import { Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

import AuthService from './services/authservice'

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)
    const [redirect, setRedirect] = useState<string | null>(null)

    useEffect(() => {
        updateUser()
    }, [])

    const handleLogout = () => {
        AuthService.logout()
        setRedirect('/login')
        setCurrentUser(undefined)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    const updateUser = () => {
        const user = AuthService.getCurrentUser()
        if (user) {
            setCurrentUser(user)
        }
    }

    return (
        <>
            <ToastConfiguration />

            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={'/'} className="navbar-brand">
                        CampusXchange
                    </Link>

                    {currentUser ? (
                        <div className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a
                                    href="/login"
                                    className="nav-link"
                                    onClick={handleLogout}
                                >
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route
                            path="/"
                            element={<Login updateUser={updateUser} />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/login"
                            element={<Login updateUser={updateUser} />}
                        />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App
