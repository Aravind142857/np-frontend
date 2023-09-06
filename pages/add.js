import React from 'react'
import Head from 'next/head'
import { useState } from 'react';
import { useRouter } from 'next/router';
function Add() {
    const router = useRouter();
    let [submitted, setIsSubmitted] = useState(false);
    let [submitting, setIsSubmitting] = useState(false);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    const handleCancel = (e)=> {
        router.push('./');
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            body: JSON.stringify({
                title,
                description,  
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setIsSubmitting(true)
        console.log("submitting ", title, description)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add`, options)
        .then(res=>res.json()).then(response=>{
            setIsSubmitted(true);
        }).catch(error=>console.log('error', error)).finally(()=>{
            setIsSubmitting(false);
        })
    }
    return (
    <>
    <Head>
        <title>Create a note</title>
        <meta name='description' content={"Create a new note"}/>
    </Head>
    <main className='px-[30%]'>
    <h3 className='text-center text-4xl my-4'>Create a note </h3>
    <form onSubmit={handleOnSubmit} className='justify-center flex items-center border-2 border-white py-8 pl-2 pr-8 flex-col'>
        {/* {% csrf_token %} */}
        <div className='py-2 flex flex-row w-full'>
            <label className='mr-2 w-32 text-right'>Title: </label>
            <input type='text' placeholder='Title' cols={30} className='px-2 text-black w-full' onChange={(event)=> {
                console.log(event.target.value);
                setTitle(event.target.value)}}/>
        </div>
        <div className='py-2 flex flex-row'>
            <label className='mr-2 w-32 text-right'>Description: </label>
            <textarea placeholder='Description' rows={3} cols={50} className='px-2 text-black w-full' onChange={(event)=> {
                console.log(event.target.value);
                setDescription(event.target.value)}}></textarea>
        </div>
        <div className='py-2 flex flex-row items-center'>
            <input value={submitting?"Please wait":'Submit'} type="submit" className='border-2 border-white p-1 m-1 mx-8 hover:bg-white hover:text-black'/>
            <input value="Cancel" type="button" className='border-2 border-white p-1 m-1 hover:bg-white hover:text-black' onClick={handleCancel} />
        </div>
    </form>
    </main>
</>)
}

export default Add
