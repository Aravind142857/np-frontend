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
  return (
    <div>
      <Head>
        <title>Note Manager: | Home</title>
        <meta name='description' content='A site for notes' />
      </Head>
      <main className='p-6 px-[30%]'>
      <h1 className='text-4xl text-center underline font-serif mb-12'>My notes</h1>  
      <div className='flex justify-between w-full bg-gray-600 my-8 self-center rounded-lg p-4'>
        <div className='text-white text-lg left-0 font-bold font-serif self-center'> {Object.keys(data).length} notes</div>
        <div className='self-center'>
          <div className='rounded-full bg-white hover:bg-green-300 flex items-center justify-center p-2' onClick={()=>handleNewNote()}>
            <IoAddOutline size={24} color="black" className='self-center'/>
          </div>
        </div>
        <div className='self-center'>
          <div className='rounded-full bg-white hover:bg-red-300 flex items-center justify-center p-2' onClick={()=>handleNewNote()}>
            <MdDelete size={24}  color="black" className='self-center'/>
          </div>
        </div>
        <span className='flex-row flex bg-white'>
          <FcSearch size={17} color='green' className='self-center mx-2 peer'/>
          <input type='search' className='text-fuchsia-900 px-4 py-2 rounded-md focus:outline-none focus:outline-4 focus:outline-offset-0 focus:outline-fuchsia-500/80' placeholder='Search for a note'/>
        </span>
      </div>
      {error&&<p>{JSON.stringify(error)}</p>}
      {data.map((element)=> <div key={element.slug} className='flex justify-center items-center mb-10'>
        <div className='bg-yellow-700 my-2 p-4 shadow-lg shadow-yellow-800 rounded-lg cursor-pointer w-[100%]' onClick={()=>handleNavigation(element)}>
        <Link href={"/"+element.slug} className='text-center font-bold uppercase text-xl'>{element.title}</Link>
          <p className='text-lg'>{element.description}</p>
          <hr></hr>
          <p className='text-sm font-bold text-emerald-200'>Created: {dateFormat(new Date(element.created_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
          <p className='text-sm font-bold text-emerald-200'>Updated: {dateFormat(new Date(element.updated_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
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