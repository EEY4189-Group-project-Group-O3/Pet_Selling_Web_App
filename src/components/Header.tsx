import { ChatIcon, BellIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/react'
import bgLogo from '../assets/Your Pet 1.png'
const Header = () => {
    return (
        <div className='h-auto p-2 bg-orange-600 flex'>
            <section className='flex-1 flex gap-0'>
                <Image src={bgLogo} className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' />

                <p className='uppercase font-extrabold text-lg'>your pet</p>
            </section>

            <section className='flex-3 flex gap-5 '>
                <p className='font-medium'>Home</p>
                <p className='font-medium'>Accessories</p>
            </section>
            <section className='flex-1 flex justify-end gap-3 box-border items-center'>
                <BellIcon w={5} h={5} />
                <ChatIcon w={5} h={5} />

                <Image src='https://bit.ly/dan-abramov' className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />
            </section>
        </div>
    )
}

export default Header