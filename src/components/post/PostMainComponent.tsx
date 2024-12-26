import Posts from './Posts'
import { Image, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CreatePost from './CreatePost'
import { useGetPetPostsPagination } from '../../pages/PetViewSection/hooks/PetPostHook'
import profile_image from '../../assets/profile_image.jpg'

const PostMainComponent = () => {
    // const [data, setData] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [page, setPage] = useState(1)
    const { data: posts } = useGetPetPostsPagination({})
    const handleClickPostCreate = () => {
        onOpen()
    }


    return (
        <div className=" bg-opacity-50 flex flex-col">
            <div className='flex justify-center items-center mt-3 mb-3 p-2'>
                < div >
                    <Image src={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).profile_image
                        : profile_image} className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />

                </ div>
                <input type="text" placeholder='create your own post' className='rounded-md p-2' onClick={handleClickPostCreate} />
            </div >
            <div className='flex flex-col gap-3 items-center'>
                <div style={{ width: "100%", display: "grid", gap: "10px", alignItems: "center" }}>
                    {
                        posts?.map((post: any) => {
                            return (
                                <Posts key={post.id} initialPost={post} />
                            )
                        })
                    }
                </div>
            </div>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <CreatePost onClose={onClose} />

            </Modal>

        </div >


    )
}

export default PostMainComponent