'use client'
import { useRouter } from 'next/navigation'
import './style.css'

export default function page() {
  const router = useRouter()
  router.push('/login')
  return (
    <div>
      
    </div>
  )
}
