import React, { useState } from 'react'
import logo from "../assets/mytube-logo-sm.png"
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react'
import Button from '../components/Button'

const PageHeader = () => {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)

    return (
        <div className='flex gap-10 lg:gap-20 justify-between pt-4 mb-6 mx-4'>
            <div className={`gap-4 items-center flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button variant={"ghost"} size={"icon"}><Menu /></Button>
                <a href="/"><img src={logo} /></a>
            </div>
            <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>
                {showFullWidthSearch && <Button variant={"ghost"} type='button' size={"icon"} className='flex-shrink-0' onClick={() => setShowFullWidthSearch(false)}><ArrowLeft /></Button>}
                <div className="flex flex-grow max-w-[600px]" >
                    <input type="search" placeholder='Search' className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary-default py-1 px-4 text-lg w-full focus:border-blue-500 outline-none' />
                    <Button className='py-2 px-4 rounded-r-full border-secondary-border border-l-0 flex-shrink-0'><Search /></Button>
                </div>
                <Button type="button" size={"icon"} className='flex-shrink-0'><Mic /></Button>
            </form>
            <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button size={"icon"} variant={"ghost"} className='md:hidden' onClick={() => setShowFullWidthSearch(true)}><Search /></Button>
                <Button size={"icon"} variant={"ghost"} className='md:hidden'><Mic /></Button>
                <Button size={"icon"} variant={"ghost"}><Upload /></Button>
                <Button size={"icon"} variant={"ghost"}><Bell /></Button>
                <Button size={"icon"} variant={"ghost"}><User /></Button>
            </div>
        </div>
    )
}

export default PageHeader