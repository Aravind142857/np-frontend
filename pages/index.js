import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import dateFormat from 'dateformat'
import { useRouter } from 'next/router'

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