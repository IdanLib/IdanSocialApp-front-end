import { Box, Typography, useTheme } from "@mui/material";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `https://idanlsocialapi.onrender.com/users/${userId}/friends`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    };
    getFriends();
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
