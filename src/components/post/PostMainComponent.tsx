import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { axios_instance } from '../../connection/client'
import CreatePost from './CreatePost'
import { useGetPetPostsPagination } from '../../pages/PetViewSection/hooks/PetPostHook'

const PostMainComponent = () => {
    // const [data, setData] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [page, setPage] = useState(1)
    const { data: posts, isLoading, refetch, } = useGetPetPostsPagination({ page: page })

    const handleClickPostCreate = () => {
        onOpen()
    }


    return (
        <div className=" bg-opacity-50 flex flex-col">
            <div className='flex justify-center items-center mt-3 mb-3 p-2'>
                < div >
                    <Image src='https://bit.ly/dan-abramov' className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />

                </ div>
                <input type="text" placeholder='create your own post' className='rounded-md p-2' onClick={handleClickPostCreate} />
            </div >
            <div className='flex flex-col gap-3 items-center'>
                <div style={{ width: "100%", display: "grid", gap: "10px", alignItems: "center" }}>
                    {/* <Posts />
                    <Posts />
                    <Posts />
                    <Posts /> */}
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