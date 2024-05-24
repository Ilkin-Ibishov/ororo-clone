import React from 'react'
import { Header } from '../components/Header'
import NoPage from '../components/NoPage'

interface Login {
    setselectedContent: React.Dispatch<React.SetStateAction<string>>
  }
const Login: React.FC<Login> = ({setselectedContent}) => {
  return (
    <div>
        <Header setselectedContent={setselectedContent} />
        <NoPage />
    </div>
  )
}

export default Login