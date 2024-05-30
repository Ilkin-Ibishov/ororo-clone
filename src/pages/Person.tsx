import { Header } from "../components/Header"
import { getPerson } from "../api/requests"
import { useState, useEffect, useRef } from "react"
import { ResponseForPerson } from "../types/PersonType"
import bgImage from "../assets/person-bg.jpg"
import PersonCasts from "../components/PersonCasts"
import noPersonPhoto from "../assets/artist-empty-avatar.png"

interface Person {
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}

const Person: React.FC<Person> = ({setselectedContent}) => {
  const selectedContent = localStorage.getItem('selectedContent') as string
  const [id, setId] = useState(localStorage.getItem("directedPageID") || "")
  const [data, setData] = useState<ResponseForPerson | null>(null);
  const idRef = useRef<string>(id);
  useEffect(() => {
    const interval = setInterval(() => {
    const newId = localStorage.getItem("directedPageID") || "";
    if (newId !== idRef.current) {
        idRef.current = newId;
        setId(newId);
    }
    }, 10)

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (id && selectedContent === 'person') {
      getPerson(id).then((response) => setData(response))
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id])
  
  return (<>
    <Header setselectedContent={setselectedContent} />
    <div style={{backgroundImage: `url(${bgImage})`, backgroundColor: 'rgba(0, 0, 0, 0.46)'}} className=" w-full h-[100%] flex md:flex-row md:px-0 px-[5%] flex-col justify-center md:items-start items-center md:gap-10 gap-2 md:py-10 py-5">
      <img src={`${ data?.person.profile_path ? "https://image.tmdb.org/t/p/w200" + (data?.person.profile_path || ''): noPersonPhoto}`} alt="Atrist photo" />
      <div className=" text-white font-bold md:w-[75%] w-full flex flex-col gap-4">
        <h1 className=" text-white md:text-3xl text-xl font-bold">{data?.person.name}</h1>
        <span>Biography</span>
        <p className="font-normal text-wrap pr-5 md:text-sm text-xs md:overflow-hidden overflow-y-scroll md:h-full h-32 pb-3">{data?.person.biography}</p>
      </div>
    </div>
    <div className="px-[5%] pt-4 flex md:flex-row flex-col">
      <div className="flex flex-col gap-1 w-1/4 text-nowrap">
        <h2 className=" text-xl font-medium">Personal Information</h2>
        <span>Gender:</span>
        <span className="text-sm">{data?.person.gender === 2? 'Male': data?.person.gender === 1 ? 'Female': data?.person.gender === 3 ? 'Non-binary': 'Unknown'}</span>
        <span>Birthday: </span>
        <span className="text-sm">{data?.person.birthday}</span>
        <span>Place of birth: </span>
        <span className=" text-sm">{data?.person.place_of_birth}</span>
        {data?.person.deathday && <span>Death day: {data?.person.deathday}</span>}
        <a href={`https://www.imdb.com/name/${data?.person.imdb_id}/`} className=" py-1 px-2 bg-yellow-500 w-fit rounded-lg">IMDB profile</a>
      </div>
      <div className=" md:w-3/4 w-full flex flex-col md:gap-20 gap-10 pb-5">
        <div hidden={data?.personMovieCredits.cast.length === 0}>
          <span className=" text-xl font-medium">Movie Casts</span>
          <PersonCasts data={data} mediaType={'movie'} />
        </div>
        <div hidden={data?.personTvCredits.cast.length === 0}>
          <span className=" text-xl font-medium">Tv Show Casts</span>
          <PersonCasts data={data} mediaType={'tv'} />
        </div>
        <div hidden={data?.personImages.profiles.length === 0}>
          <span className=" text-xl font-medium">Images:</span>
          <div className="flex overflow-x-scroll gap-5 h-60">{data?.personImages.profiles.map((image, index) => 
            <img key={index} src={`https://image.tmdb.org/t/p/w500${image.file_path || ''}`} alt="Movie photo" />
            )}</div>
        </div>
      </div>
    </div>
    </>
  )
}
  

export default Person