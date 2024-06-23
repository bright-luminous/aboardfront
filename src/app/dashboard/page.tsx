import FullWidthTextField from "@/component/searchBar";
import RootLayout from "../layout";
import DashboardLayout from "./layout";
import CommunitySelect from "@/component/communitySelect";
import { Button } from "@mui/material";
import PostList from "@/component/postList";

const Dashboard = () => {
  return (
    <div className=" w-full h-dvh">
      <div className="flex place-content-center">
        <FullWidthTextField />
        <CommunitySelect />
        <Button
          variant="contained"
          size="large"
          sx={{ marginRight: 1, bgcolor: "#49A569" }}
          disableElevation
        >
          Create +
        </Button>
      </div>
      <div className="flex place-content-center mt-5">
        <PostList />
      </div>
    </div>
  );
};

export default Dashboard;
