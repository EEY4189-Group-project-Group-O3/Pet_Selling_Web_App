"use client";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { Image, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import { useGetPetPostsPagination } from "../../pages/PetViewSection/hooks/PetPostHook";
import profile_image from "../../assets/profile_image.jpg";
import { FaSearch } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import { CategoryDropdown } from "./CategoryDropdown";
const PostMainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    // onSearch(searchTerm);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      refetch();
    }
  }, [searchTerm]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: posts, refetch } = useGetPetPostsPagination({
    category_id: selectedCategory !== null ? selectedCategory : undefined,
    keyword: searchTerm !== "" ? searchTerm : undefined,
  });

  const handleClickPostCreate = () => {
    onOpen();
  };

  const handleCategorySelect = (category: { id: string; name: string }) => {
    setSelectedCategory(category.id);
    refetch();
  };

  return (
    <div className=" bg-opacity-50 flex flex-col">
      <div className="flex justify-center items-center mt-3 mb-3 p-2">
        <div>
          <Image
            src={
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user") as string)
                    .profile_image
                : profile_image
            }
            className="mr-5"
            alt="Dan Abramov"
            boxSize={"30px"}
            objectFit="cover"
            borderRadius={"50%"}
          />
        </div>
        <input
          type="text"
          placeholder="create your own post"
          className="rounded-md p-2"
          onClick={handleClickPostCreate}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5 p-4 bg-orange-300 rounded-lg shadow-md">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-3 top-2 text-gray-500 hover:text-orange-500"
            onClick={handleSearch}
          >
            <FaSearch size={18} />
          </button>
        </div>

        <div className="relative">
          <MdSort className="absolute left-3 top-3 text-gray-500" size={20} />
          <CategoryDropdown
            onSelect={handleCategorySelect}
            inpostform={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <div
          style={{
            width: "100%",
            display: "grid",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {posts?.map((post: any) => {
            return <Posts key={post.id} initialPost={post} />;
          })}
        </div>
      </div>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <CreatePost onClose={onClose} />
      </Modal>
    </div>
  );
};

export default PostMainComponent;
