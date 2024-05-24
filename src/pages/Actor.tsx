import { Header } from "../components/Header"
// import { getPerson } from "../api/requests"
// import { useState, useEffect, useRef } from "react"
// import { Person } from "../types/types"

interface Actor {
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}

const Actor: React.FC<Actor> = ({setselectedContent}) => {
  // const selectedContent = localStorage.getItem('selectedContent') as string
  // const [id, setId] = useState(localStorage.getItem("directedPageID") || "")
  // const [data, setData] = useState<Person | null>(null);
  // const idRef = useRef<string>(id);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //   const newId = localStorage.getItem("directedPageID") || "";
  //   if (newId !== idRef.current) {
  //       idRef.current = newId;
  //       setId(newId);
  //   }
  //   }, 10)

  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   if (id && selectedContent === 'person') {
  //     getPerson(id).then((response) => setData(response as Person))
  // }
  // }, [id])
  // console.log(data);
  
  return (
    <Header setselectedContent={setselectedContent} />
  )
}
  

export default Actor