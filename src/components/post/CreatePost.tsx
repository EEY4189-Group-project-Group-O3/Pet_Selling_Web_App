import React, { useEffect } from 'react'
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, IconButton, ModalHeader, Textarea, Divider, Box, Text, SimpleGrid } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { Spinner } from '@chakra-ui/react'
import { axios_instance } from '../../connection/client';
import { useAddPetPost } from '../../pages/PetViewSection/hooks/PetPostHook';
interface createpostProps {
  onClose: () => void
}

const CreatePost = ({ onClose }: createpostProps) => {
  const [showImgInsert, setShowImgInsert] = React.useState(false)
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  // const [isLoading, setIsLoading] = React.useState(false)
  const [postData, setPostData] = React.useState({
    content: '',
  })
  const addImages = () => {
    setShowImgInsert(!showImgInsert)
  }

  const onDrop = (acceptedFiles: File[]) => {
    // Add the newly dropped files to the state
    setUploadedFiles([...uploadedFiles, ...acceptedFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  })



  const handleRemoveImage = (file: File, index: number) => {
    // Remove the image from the state
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const { mutate, isPending, isError, isSuccess } = useAddPetPost()

  useEffect(() => {

    if (isSuccess) {
      onClose()
    }

  }, [isError, isSuccess])

  const handlePost = () => {
    // setIsLoading(true)
    const formData = new FormData()
    uploadedFiles.forEach(file => {
      formData.append('images', file)
    })
    formData.append('text', postData.content)
    // axios_instance.post('/post/post/',
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     }
    //   }
    // ).then(res => {
    //   console.log(res.data)
    //   onClose()
    //   setIsLoading(false)

    // }
    // ).catch(err => {
    //   console.log(err)
    //   setIsLoading(false)
    // })
    mutate(formData)
    // setIsLoading(false)
  }
  return (
    <div className='w-[250px]'>

      <ModalContent>
        <ModalHeader textAlign={'center'}>Create Post</ModalHeader>
        <ModalCloseButton className='border-none' />
        <Divider />
        <ModalBody>
          <section className="flex m-2">
            <Image src='https://bit.ly/dan-abramov' className="mr-5" alt='Dan Abramov' boxSize={"30px"} objectFit='cover' borderRadius={"50%"} />
            <div className='flex flex-col'>
              <p>Sandun Tharaka</p>
              <p>public</p>
            </div>
          </section>

          <Textarea
            placeholder='What’s on your mind?'
            size='sm'
            resize={'vertical'}
            onChange={e => setPostData({ ...postData, content: e.target.value })}
          />

          <Divider margin={2} />

          {/* Conditionally show the drag and drop area when showImgInsert is true */}
          {
            showImgInsert && (
              <Box
                {...getRootProps()}
                border="2px dashed gray"
                padding="20px"
                textAlign="center"
                borderRadius="md"
                cursor="pointer"
                backgroundColor={isDragActive ? "gray.100" : "transparent"}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Text>Drop the files here...</Text>
                ) : (
                  <Text>Drag & drop some images here, or click to select files</Text>
                )}
              </Box>
            )
          }

          {/* Show preview of uploaded images in a grid */}
          {uploadedFiles.length > 0 && (
            <SimpleGrid columns={[2, 3]} spacing={2} mt={4}>
              {uploadedFiles.map((file, index) => (
                <div className='relative mt-3'>
                  <div className=' absolute right-0 -top-3 '>
                    <IoIosCloseCircle className='hover:text-red-500' onClick={e => handleRemoveImage(file, index)} />
                  </div>
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    className='ml-auto mr-auto'
                  />
                </div>
              ))}
            </SimpleGrid>
          )}

          <div className='bg-slate-200 p-2 m-3 flex items-center justify-between rounded-md'>
            <p className='font-bold'>Add to your post</p>
            <IconButton
              variant='outline'
              colorScheme='yellow'
              aria-label='Add image'
              icon={<CiImageOn fontSize={25} />}
              onClick={addImages}
            />
          </div>
        </ModalBody>

        <div className='flex justify-center m-2'>
          <Button width={"80%"} border={'none'} colorScheme='blue' onClick={handlePost} className='flex gap-3'> <span>Post</span> {
            isPending && <Spinner />
          }</Button>
        </div>

      </ModalContent>
    </div>
  )
}

export default CreatePost
