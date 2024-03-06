'use client'
import React, { ChangeEvent, useState } from 'react'
import './register.css'
import { useRouter } from 'next/navigation'
import {login, registerUsers} from '@/services/authen.service'
import { toastAlert } from '@/services/alert.service'
import Loadding from '@/components/load/Loadding'
import { Users } from '@/interfaces/users.model'
import Link from 'next/link'


export default function page() {
  const router = useRouter()
  const r = {} as Users
  const [register, setRegister] = useState<Users>(r)
  const [load, setLoad] = useState<boolean>(false)

    async function onRegister(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        e.preventDefault()
        setLoad(true)
        const chackPass = document.getElementById('checkPassword') as HTMLInputElement
        // if(chackPass.value === register.password) {
        //     alert('not macth')
        //     setLoad(false)
        // }
        // else{
            try {
                const data = {} as Users
                data.username = register.username,
                data.password = register.password,
                data.firstname = register.firstname,
                data.lastname = register.lastname
                const result = await registerUsers(data)
                setLoad(false)
                router.push('/login')
            } catch (error) {
                setLoad(false)
                throw error
            }
        // }
    }
  return (
    <div>
      <div className="log">
        <h2>Register BaanRimRou</h2>
        <form >
          <div className="input-cont">
            <input type="text" onChange={(e) => setRegister({...register, username: e.target.value})} />
            <label>Username</label>
            <div className="border1"></div>
          </div>
          <div className="input-cont">
            <input type="text" id='password' onChange={(e) => setRegister({...register, password: e.target.value})}/>
            <label>Password</label>
            <div className="border2"></div>
          </div>
          <div className="input-cont">
            <input type="text" id='checkPassword'/>
            <label>Password</label>
            <div className="border2"></div>
          </div>
          <div className="input-cont">
            <input type="text" onChange={(e) => setRegister({...register, firstname: e.target.value})}/>
            <label>FirstName</label>
            <div className="border2"></div>
          </div>
          <div className="input-cont">
            <input type="text" onChange={(e) => setRegister({...register, lastname: e.target.value})}/>
            <label>LastName</label>
            <div className="border2"></div>
          </div>
          {/* <span className="check">
            <input type="checkbox" onClick={() => setRemember(true)} /> <label>Remember Me</label>
          </span> */}
          <button className='btnLogin' type="button" value="Sign In" onClick={(e) =>onRegister(e)}>Register</button>
          <button className='btnLogin' onClick={() => router.push('/login')} type="button">Login</button>
        </form>
      </div>
      <Loadding data={load} />
    </div>
  )
}
