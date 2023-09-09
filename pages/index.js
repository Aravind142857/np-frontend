import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import dateFormat from 'dateformat'
import { useRouter } from 'next/router'
import {FcSearch} from "react-icons/fc"
import {IoAddOutline} from "react-icons/io5"
import {MdDelete} from "react-icons/md"
import { FaDivide } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data,error}) {

  const router = useRouter()
  useEffect(()=>{
    console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL);
  },[])
  const handleNavigation=({slug})=>{
    router.push("/" + slug);
  }
  const toggleDelete = (e) => {
    var items = document.getElementsByClassName("delete-button");
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains("hidden")) {
        items[i].classList.remove("hidden");
        items[i].classList.add("flex")
      } else {
        items[i].classList.remove("flex");
        items[i].classList.add("hidden");
      }
    }
  }
  return (
    <div>
      <Head>
        <title>Note Manager: | Home</title>
        <meta name='description' content='A site for notes' />
      </Head>
      <main className='p-6 xl:px-[30%] lg:px-[25%] px-[10%]'>
      <h1 className='text-4xl text-center underline font-serif mb-12'>My notes</h1>  
      <nav className='flex xl:flex-row flex-col flex-shrink justify-between items-center w-full bg-gray-600 my-8 self-center rounded-lg p-4 sticky top-2 '>
        <div className='xl:my-0 my-1 rounded-lg p-1 text-white text-lg left-0 bg-pink-600 selection:bg-black selection:text-white w-fit font-bold font-serif self-center text-center'> {Object.keys(data).length} notes</div>
        <div className='xl:my-0 my-1 self-center w-fit'>
          <div className='rounded-full bg-white hover:bg-green-300 flex items-center justify-center p-2'>
            <a href='add'>
            <IoAddOutline size={24} color="black" className='self-center'/>
            </a>
          </div>
        </div>
        <div className='xl:my-0 my-1 self-center w-fit'>
          <div className='rounded-full bg-white hover:bg-red-300 flex items-center justify-center p-2'>
            <MdDelete size={24}  color="black" className='self-center' onClick={toggleDelete}/>
          </div>
        </div>
        <span className='xl:my-0 my-1 flex-row flex bg-white'>
          <FcSearch size={17} color='green' className='self-center mx-2 peer'/>
          <input type='search' className='text-fuchsia-900 px-4 py-2 rounded-md focus:outline-none focus:outline-4 focus:outline-offset-0 focus:outline-fuchsia-500/80' placeholder='Search for a note'/>
        </span>
      </nav>
      
      {error&&<p>{JSON.stringify(error)}</p>}
      {data.map((element)=> <div key={element.slug} className='flex justify-center items-center mb-10'>
        <div className='bg-yellow-700 my-2 p-4 shadow-lg shadow-yellow-800 rounded-lg cursor-pointer w-[100%] mr-4' onClick={()=>handleNavigation(element)}>
        <Link href={"/"+element.slug} className='text-center font-bold uppercase text-xl'>{element.title}</Link>
          <p className='text-lg'>{element.description}</p>
          <hr></hr>
          <p className='text-sm font-bold text-emerald-200'>Created: {dateFormat(new Date(element.created_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
          <p className='text-sm font-bold text-emerald-200'>Updated: {dateFormat(new Date(element.updated_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
        </div>
        <div className='delete-button rounded-full bg-transparent border-2 border-red-600 w-12 h-12 text-center hidden items-center justify-center'>
          X
        </div>
      </div>)}
      </main>
    </div>
    )
}
export async function getStaticProps(){
  let data = []
  let error=null
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
    data = await response.json();
    
}
catch(err) {
  error = err.message?err.message:"Something went wrong"
}
// if (!data.length) {
//   return {
//     notFound: true,
//   }
// }
// Shows custom error
return {
  props: {
    data:data,
    error: error,
  }
}
}