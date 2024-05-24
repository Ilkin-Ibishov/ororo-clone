import React from 'react'
import { Header } from '../components/Header'
import NoPage from '../components/NoPage'

interface SignUp {
    setselectedContent: React.Dispatch<React.SetStateAction<string>>
  }
const SignUp: React.FC<SignUp> = ({setselectedContent}) => {
  return (
    <div>
        <Header setselectedContent={setselectedContent} />
        <NoPage />
    </div>
  )
}

export default SignUp