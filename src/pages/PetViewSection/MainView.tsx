import MainLayout from "../../layouts/MainLayout";
import PostMainComponent from "../../components/post/PostMainComponent";

const MainView = () => {
  return (
    <MainLayout>
      <PostMainComponent isAccessories={false} />
    </MainLayout>
  );
};

export default MainView;
