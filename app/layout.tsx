import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/models/Modal'
import RegisterModal from './components/models/RegisterModal'
import LoginModal from './components/models/LoginModal'
import RentModal from './components/models/RentModal'
import SearchModal from './components/models/SearchModal'
import ToasterProvider from './components/providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'


const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Reservations APP',
  description: 'by Raghad Nakshou',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider/>
        <SearchModal/>
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        
        <div className='pb-20 pt-28'>

        {children}
        </div>
        </body>
    </html>
  )
}
