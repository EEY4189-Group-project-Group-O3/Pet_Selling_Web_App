import PostMainComponent from "../../components/post/PostMainComponent";
import MainLayout from "../../layouts/MainLayout";
import { useGetPostCatrgoties } from "../../pages/PetViewSection/hooks/PostCategoryHook";

const AccessoriesView = () => {
  const { data: categories = [] } = useGetPostCatrgoties({});
  const accessoriesCategory = categories.find(
    (category) => category.name === "Accessories"
  );

  return (
    <MainLayout>
      <PostMainComponent
        isAccessories={true}
        accessories_id={accessoriesCategory?.id.toString()}
      />
    </MainLayout>
  );
};

export default AccessoriesView;
