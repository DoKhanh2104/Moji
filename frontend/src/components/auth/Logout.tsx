import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate } from 'react-router'

const Logout = () => {

    const { signOut } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut();
        navigate('/signin')
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout