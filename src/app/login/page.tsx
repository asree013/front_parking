'use client'
import React, { useState } from 'react'
import './login.css'
import { useRouter } from 'next/navigation'
import {login} from '@/services/authen.service'
import { toastAlert } from '@/services/alert.service'
import Loadding from '@/components/load/Loadding'
import Link from 'next/link'


export default function page() {
  const router = useRouter()
  const [logins, setLogins] = useState<{username: string, password: string}>({username: "", password: ''})
  const [remember, setRemember] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)

  async function onLogin() {
    setLoad(true)
    const authen = {
      username: logins.username,
      password: logins.password
    }
    try {
      const result = await login(authen)      
      if(result){
        if(remember === false) {
          const rem = {
            jwt: JSON.stringify(result.access_token),
            createDate: '',
            expirationDate: ''
          }
          localStorage.setItem('authen', JSON.stringify(rem))
          toastAlert('logined success!!!', 'success')
          router.push('/park')
          setLoad(false)
        }
        else{
          const rem = {
            jwt: result.access_token,
            createDate: new Date(),
            expirationDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
          }
          localStorage.setItem('authen', JSON.stringify(rem))
          toastAlert('logined success!!!', 'success')
          router.push('/park')
          setLoad(false)
        }
      }
      
    } catch (error: any) {
      console.log(error.message);
      setLoad(false)
      toastAlert('username หรือ password ผิด', 'error')
    }
  }
  return (
    <div>
      <div className="log">
        <h2>BaanRimRou</h2>
        <form>
          <div className="input-cont">
            <input type="text" onChange={(e) => setLogins({...logins, username: e.target.value})} />
            <label>Username</label>
            <div className="border1"></div>
          </div>
          <div className="input-cont">
            <input type="password" onChange={(e) => setLogins({...logins, password: e.target.value})}/>
            <label>Password</label>
            <div className="border2"></div>
          </div>
          <span className="check">
            <input type="checkbox" onClick={() => setRemember(true)} /> <label>Remember Me</label>
          </span>
          <Link href={'/register'}>
            <p>สมัครสมาชิก</p>
          </Link>
          <div className="clear"></div>
          <button className='btnLogin' type="button" value="Sign In" onClick={onLogin}>Sing In</button>
        </form>
      </div>
      <Loadding data={load} />
    </div>
  )
}
