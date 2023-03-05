import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWidget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import UserWidget from "@/scenes/widgets/UserWidget";
import { api } from "@/api/api";

const ProfilePage = () => {
  const { userId: profileId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const loggedInUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const getUserFromApi = async () => {
      const data = await api.getUser(profileId, token);
      setProfileUser(data);
    };

    getUserFromApi();
  }, []); //eslint-diable-line react-hooks/exhaustive-deps

  if (!profileUser) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={profileId}
            picturePath={profileUser.picturePath}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={profileId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={loggedInUser.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={profileId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
