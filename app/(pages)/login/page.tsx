'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../public/Capa_1.svg'
import { login } from 'services/login'
import { Input } from 'commons/generic/Input'
import useInput from 'hooks/useInput'
import {
    AiOutlineUser,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { setUser } from 'store/slices/adminSlice'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const email = useInput('')
    const password = useInput('')
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const user = await login(email.value, password.value)
            if (user !== null && user !== undefined) {
                dispatch(setUser(user))
                router.push('/home')
            } else {
                await Swal.fire({
                    text: 'Email y/o contraseña incorrectos',
                    icon: 'error',
                })
            }
        } catch (error) {
            console.error('handleLogin error', error)
        }
    }

    return (
        <main className="bg-primary p-20 h-screen flex flex-col justify-center items-center">
            <div className="animate-fade-down animate-once animate-ease-linear">
                <Image
                    src={Logo}
                    alt="Fast Delivery Logo"
                    className=""
                    width={300}
                    height={24}
                    priority
                />
            </div>
            <form
                onSubmit={() => handleLogin}
                className="rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                <div className="mb-4">
                    <Input
                        customStyle="bg-primary text-white placeholder-white border-white rounded-lg"
                        placeholder="email@contraseña.com"
                        type="text"
                        iconType={
                            <AiOutlineUser className="w-full h-full text-white" />
                        }
                        value={email.value}
                        onChange={email.onChange}
                    />
                </div>
                <div className="mb-6">
                    <Input
                        customStyle="bg-primary text-white placeholder-white border-white rounded-lg"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password.value}
                        onChange={password.onChange}
                        iconType={
                            <HiOutlineLockClosed className="w-full h-full text-white" />
                        }
                        iconTypeRight={
                            showPassword ? (
                                <AiOutlineEye className="w-full h-full text-white cursor-pointer" />
                            ) : (
                                <AiOutlineEyeInvisible className="w-full h-full text-white cursor-pointer" />
                            )
                        }
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </div>
                <div className="flex flex-col items-center justify-between text-center">
                    <button
                        className="bg-secondary text-primary py-2 w-72 rounded-3xl"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Login
