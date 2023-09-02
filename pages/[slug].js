import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dateFormat from 'dateformat'
import Link from 'next/link'
import Head from 'next/head'
import {FaCheckCircle} from "react-icons/fa"
import { icons } from 'react-icons'
function Note({data}) {
    let [submitted, setIsSubmitted] = useState(false);
    let [submitting, setIsSubmitting] = useState(false);
    let [email, setEmail] = useState("");
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const options = {
            method: "POST",
            body: JSON.stringify({
                email,
                note: data.id   
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setIsSubmitting(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribers`, options)
        .then(res=>res.json()).then(response=>{
            setIsSubmitted(true);
        }).catch(error=>console.log('error', error)).finally(()=>{
            setIsSubmitting(false);
        })    }
    console.log('email', email)
  return (
    <div>
        <Head>
            <title>{data.title}</title>
            <meta name='description' content={data.description}/>
        </Head>
        <div className='min-h-screen bg-[#0a0f04] fixed w-[100%] z-1'>
            <div className="bg-[url(https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1200)] bg-no-repeat absolute top-0 h-[100%] w-[100%] bg-cover bg-center  opacity-[0.08]">

            </div>
            <div className='w-[100%] px-40 py-28 text-white'>
                <div className='flex'>
                    <div className='w-[50%] z-10'>
                        <h1 className='text-left font-bold uppercase text-xl'>{data.title}</h1>
                        <p className='text-lg'>{data.description}</p>
                    </div>
                    <div className='z-10'>
                        {!submitted? 
                        <div className='ml-24'>
                            <form onSubmit={handleOnSubmit}>
                                <div className='mb-4'>
                                    <input type='email' required name='email' placeholder='Enter an email' onChange={(event)=> {
                                        setEmail(event.target.value)
                                    }} className='text-lg bg-white p-3 border-2 border-[#e3e3e3] flex-1 w-[100%] cursor-text font-bold text-violet-800 h-14' />
                                </div>
                                <div>
                                    <input type='submit' value={submitting?"Please wait":'SUBSCRIBE'} aria-disabled={submitting} className='text-white bg-purple-600 rounded-sm font-bold p-3 transition ease-in cursor-pointer w-[100%] hover:bg-opacity-75' />
                                </div>
                            </form>
                        </div>:<div className='h-16 w-[100%] flex justify-center items-center bg-white p-8 rounded-xl ml-8'>
                                <div className=''><FaCheckCircle size={17} color='green'/></div>
                                <div className='pl-3 text-black'>
                                Thank you for your subscription
                                </div>
                    </div>
                    }
                </div>
            </div>

        </div>

        {/* <div key={data.slug} className='flex justify-center items-center'>
        <div className='bg-yellow-700 my-2 p-4 shadow-lg shadow-yellow-500 rounded-lg cursor-pointer'>
        <div className='text-center font-bold uppercase text-xl'>{data.title}</div>
          <p className='text-lg'>{data.description}</p>
          <hr></hr>
          <p className='text-sm font-bold text-emerald-200'>Created: {dateFormat(new Date(data.created_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
          <p className='text-sm font-bold text-emerald-200'>Updated: {dateFormat(new Date(data.updated_at), "dddd, mmmm   dS, yyyy, h:MM:ss TT")}</p>
        </div>
        <footer className='absolute bottom-0 left-0 right-0 w-[100%] text-white z-[2] border-t-2 border-solid border-white flex justify-center  h-[100px] items-center'>
            <Link href={"/"}>Go back to List</Link>
        </footer>
 
      </div> */}
    </div>
    </div>
  )
}
export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
    const data = await response.json();
    const allSlugs = data.map(item => item.slug)
    const paths = allSlugs.map(slug=>({params: {slug: slug}}))
    return {
        paths,
        fallback: false,
    }
    

}
export async function getStaticProps({ params }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes/${params.slug}`);
    const data = await response.json();

    // const allSlugs = data.map(item => item.slug)
    // const paths = allSlugs.map(slug=>({params: {slug: slug}}))
    return {
        props: {
            data
        }
    }
}
export default Note;