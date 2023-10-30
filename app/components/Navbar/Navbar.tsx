'use client'

import React from 'react'
import  Container from '../Container';
import Logo from './Logo';
import Srearch from './Srearch';
import UserMenue from './UserMenue';
import { SafeUser } from '@/app/types';
import Categories from './Categories';

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  console.log({currentUser})
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0'>
                    <Logo/>
                    <Srearch/>
                    <UserMenue currentUser={currentUser}/>

                </div>
            </Container>
         </div> 
         <Categories />
    </div>
  )
}

export default Navbar