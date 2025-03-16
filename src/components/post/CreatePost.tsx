import React, { useEffect } from "react";
import {
  Button,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  IconButton,
  ModalHeader,
  Textarea,
  Divider,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { Spinner } from "@chakra-ui/react";
import { useAddPetPost } from "../../pages/PetViewSection/hooks/PetPostHook";
import profile_image from "../../assets/profile_image.jpg";
import { CategoryDropdown } from "./CategoryDropdown";
import { IoCloseCircleSharp } from "react-icons/io5";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
interface createpostProps {
  onClose: () => void;
  isAccessories: boolean;
  accessories_id?: string | undefined;
}

interface category {
  id: string;
  name: string;
}

const CreatePost = ({
  onClose,
  isAccessories,
  accessories_id,
}: createpostProps) => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showImgInsert, setShowImgInsert] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    category[]
  >([]);
  // const [isLoading, setIsLoading] = React.useState(false)
  const [postData, setPostData] = React.useState({
    content: "",
  });

  const addImages = () => {
    setShowImgInsert(!showImgInsert);
  };

  const onDrop = (acceptedFiles: File[]) => {
    // Add the newly dropped files to the state
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    // Remove the image from the state
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const { mutate, isPending, isError, isSuccess } = useAddPetPost();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isError, isSuccess]);

  useEffect(() => {}, [selectedCategories]);

  const handlePost = () => {
    if (selectedCategories.length > 0) {
      let updatedCategories = [...selectedCategories];

      if (isAccessories) {
        const isAlreadyAdded = updatedCategories.some(
          (cat) => cat.id === accessories_id
        );
        if (!isAlreadyAdded) {
          updatedCategories.push({
            id: accessories_id as string,
            name: "Accessories",
          });
        }
      }

      setSelectedCategories(updatedCategories); // Update state

      // Use updatedCategories immediately (since setState is async)
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("text", postData.content);
      console.log("Sending Categories:", updatedCategories); // Logs updated value
      formData.append("categories", JSON.stringify(updatedCategories));

      mutate(formData);
    } else {
      setErrorMessage("Please select a category");
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="w-[250px]">
      <ModalContent>
        <ModalHeader textAlign={"center"}>Create Post</ModalHeader>
        <ModalCloseButton className="border-none" />
        <Divider />
        <ModalBody>
          <section className="flex m-2">
            <Image
              src={
                localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user") as string)
                      ?.profile_image
                  : profile_image
              }
              className="mr-5"
              alt="Dan Abramov"
              boxSize={"30px"}
              objectFit="cover"
              borderRadius={"50%"}
            />
            <div className="flex flex-col">
              <p>
                <span>
                  {
                    JSON.parse(localStorage.getItem("user") as string)
                      ?.first_name
                  }
                </span>
                <span>
                  {
                    JSON.parse(localStorage.getItem("user") as string)
                      ?.last_name
                  }
                </span>
              </p>
              <p>public</p>
            </div>
          </section>
          <div className="flex justify-end mb-2">
            <CategoryDropdown
              onSelect={(category) =>
                setSelectedCategories([
                  ...selectedCategories,
                  { id: category.id, name: category.name },
                ])
              }
              inpostform={true}
            />
          </div>

          <div className="flex gap-2 items-center m-2">
            {
              // Show selected categories
              selectedCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center bg-gray-500 p-1 rounded-md text-white"
                >
                  <p>{category.name}</p>
                  <IoCloseCircleSharp
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedCategories(
                        selectedCategories.filter((_, i) => i !== index)
                      )
                    }
                  />
                </div>
              ))
            }
          </div>

          <Textarea
            placeholder="What’s on your mind?"
            size="sm"
            resize={"vertical"}
            onChange={(e) =>
              setPostData({ ...postData, content: e.target.value })
            }
          />

          <Divider margin={2} />

          {/* Conditionally show the drag and drop area when showImgInsert is true */}
          {showImgInsert && (
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
                <Text>
                  Drag & drop some images here, or click to select files
                </Text>
              )}
            </Box>
          )}

          {/* Show preview of uploaded images in a grid */}
          {uploadedFiles.length > 0 && (
            <SimpleGrid columns={[2, 3]} spacing={2} mt={4}>
              {uploadedFiles.map((file, index) => (
                <div className="relative mt-3">
                  <div className=" absolute right-0 -top-3 ">
                    <IoIosCloseCircle
                      className="hover:text-red-500"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                    className="ml-auto mr-auto"
                  />
                </div>
              ))}
            </SimpleGrid>
          )}

          <div className="bg-slate-200 p-2 m-3 flex items-center justify-between rounded-md">
            <p className="font-bold">Add to your post</p>
            <IconButton
              variant="outline"
              colorScheme="yellow"
              aria-label="Add image"
              icon={<CiImageOn fontSize={25} />}
              onClick={addImages}
            />
          </div>
        </ModalBody>

        <div className="flex justify-center m-2">
          <Button
            width={"80%"}
            border={"none"}
            colorScheme="blue"
            onClick={handlePost}
            className="flex gap-3"
          >
            {" "}
            <span>Post</span> {isPending && <Spinner />}
          </Button>
        </div>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </ModalContent>
    </div>
  );
};

export default CreatePost;
