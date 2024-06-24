"use client";

import FullWidthTextField from "@/component/searchBar";
import CommunitySelect from "@/component/communitySelect";
import {
  Backdrop,
  Button,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import PostList from "@/component/postList";
import { useContext, useEffect, useState } from "react";
import CreatePostCard from "@/component/createPostCard";
import * as React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { OurPostContext } from "../public/itemContext";

const Dashboard = () => {
  const {ourPostState, setOurPostState} = useContext(OurPostContext);

  const ownerDetail = getCookie("user")?.toString();
  const [isOpen, setOpen] = useState(false);
  function toggle() {
    setOpen((isOpen) => !isOpen);
  }

  const [selectedCommunity, setSelectedCommunity] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCommunity(event.target.value as string);
  };

  const [postList, setPostList] = useState([]);
  function queryPostListCommunity(selectedCommunity: string, ownerTF: boolean) {
    const ownerDetailJson = JSON.parse(ownerDetail!);

    if (ownerTF === true) {
      axios
        .get(
          `http://localhost:3000/post/community?community=${selectedCommunity}&owner=${ownerDetailJson.id}`
        )
        .then((response) => {
          if (response.data != null) {
            setPostList(response.data);
          }
        });
    } else {
      axios
        .get(
          `http://localhost:3000/post/community?community=${selectedCommunity}&owner=`
        )
        .then((response) => {
          if (response.data != null) {
            setPostList(response.data);
          }
        });
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/post/detail`).then((response) => {
      if (response.data != null) {
        setPostList(response.data);
      }
    });
  }, []);

  useEffect(() => {
    queryPostListCommunity(selectedCommunity,ourPostState);
  }, [ourPostState,selectedCommunity,toggle]);

  return (
    <div className=" w-full h-full bg-[#BBC2C0]">
      <div className="flex place-content-center pt-8">
        <FullWidthTextField />
        <CommunitySelect
          selectedCommunity={selectedCommunity}
          handleChange={(e) => handleChange(e)}
        />
        <Button
          onClick={toggle}
          variant="contained"
          size="large"
          sx={{ marginX: 2, bgcolor: "#49A569" }}
          disableElevation
        >
          Create +
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
      >
        <CreatePostCard
          isActive={isOpen}
          onShow={() => toggle()}
        ></CreatePostCard>
      </Backdrop>
      <div className="flex place-content-center mt-5">
        <PostList currentPostList={postList} />
      </div>
    </div>
  );
};

export default Dashboard;
