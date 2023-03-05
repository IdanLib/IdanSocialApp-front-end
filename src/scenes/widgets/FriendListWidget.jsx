import { Box, Typography, useTheme } from "@mui/material";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";
import { api } from "@/api/api.js";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    const getFriendsFromApi = async () => {
      const data = await api.getFriends(userId, token);
      dispatch(setFriends({ friends: data }));
    };

    getFriendsFromApi();
  }, []); //eslist-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{
          mb: "1.5rem",
        }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((fr) => (
          <Friend
            key={fr._id}
            friendId={fr._id}
            name={`${fr.firstName} ${fr.lastName}`}
            subtitle={fr.occuption}
            userPicturePath={fr.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
