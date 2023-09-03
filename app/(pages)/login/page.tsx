'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/Capa_1.svg'
import { Button } from 'commons/Button'
import { login } from 'services/login'
import { useDispatch } from 'react-redux'
import { setCurrentAdmin } from 'store/slices/adminSlice'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        void (async () => {
            try {
                const user = await login(email, password)
                if (user !== null && user !== undefined) {
                    dispatch(setCurrentAdmin(user))
                    router.push('/agenda')
                }
            } catch (error) {
                console.error('Login error: ', error)
            }
        })()
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
                className="rounded px-8 pt-6 pb-8 mb-4 w-96"
                onSubmit={handleLogin}
            >
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                        id="email"
                        type="text"
                        placeholder="email@contraseña.com"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div className="mb-6">
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex flex-col items-center justify-between text-center">
                    <button
                        className="bg-secondary text-primary py-2 w-72 rounded-3xl"
                        type="submit"
                    >
                        Ingresar
                    </button>
                    <a href="/" className="text-white font-extralight mt-4">
                        OLVIDÉ MI CONTRASEÑA
                    </a>
                    <a href="/signup" className="text-white mt-2 font-bold">
                        REGISTRARSE
                    </a>
                </div>
            </form>
        </main>
    )
}

export default Login
