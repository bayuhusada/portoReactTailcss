import React, {useState} from 'react'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
const [nav, setNav] = useState(false)

const handleNav = () => {
  setNav(!nav)
}


  return (
    
    <div className=' flex items-center h-24 max-w-[1240px] mx-auto justify-between px-5 '>
      <h1 className='w-full font-bold text-oreng text-2xl md:text-3xl'>BAY</h1>
        <ul className='hidden md:flex lg:w-auto md:w-auto'>
          <li className='p-2 text-oreng font-semibold hover:underline hover:text-primary'>PROJECT</li>
          <li className='p-2 text-oreng font-semibold hover:underline hover:text-primary'>SERTI</li>
          <li className='p-2 text-oreng font-semibold hover:underline hover:text-primary'>CONTACT</li>
          <li className='p-2 text-oreng font-semibold hover:underline hover:text-primary'>ABOUT</li>
        </ul>
        <div onClick={handleNav} className=' block md:hidden'>
          {nav ? <AiOutlineClose size={30} color='#eeeeee'/> : <AiOutlineMenu size={30} color='#DC5F00'/>}
        </div>
      <div>
        <div className={nav ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-slate-300 bg-abubua ease-in duration-500' : '  ease-out duration-1000 fixed left-[-100%]'}>
        <h1 className='w-full m-4 font-bold underline underline-offset-auto text-oreng text-2xl md:text-3xl'>BAYU.</h1>
        <ul className='p-2'>
          <li className='p-3 border-b border-oreng hover:border-primary text-primary font-medium hover:text-oreng hover:'>ABOUT</li>
          <li className='p-3 border-b border-oreng hover:border-primary text-primary font-medium hover:text-oreng hover:'>PROJECT</li>
          <li className='p-3 border-b border-oreng hover:border-primary text-primary font-medium hover:text-oreng hover:'>SERTI</li>
          <li className='p-3 border-b border-oreng hover:border-primary text-primary font-medium hover:text-oreng hover:'>CONTACT</li>
        </ul>
        </div>
      </div>
    </div>
  )
}
  
export default Navbar