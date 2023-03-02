import {
  Box,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Link,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@mui/icons-material";
import { setSocial } from "@/state";

export const SocialProfiles = ({ user, setUser }) => {
  const [twitterHandle, setTwitterHandle] = useState(user.twitter);
  const [isShowTwitterEditField, setIsShowTwitterEditField] = useState(false);
  const [linkedInHandle, setLinkedInHandle] = useState(user.linkedIn);
  const [isShowLinkedInEditField, setIsShowLinkedInEditField] = useState(false);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const updateSocialHandle = async (handlingFunc) => {
    let reqBody = handlingFunc();

    const response = await fetch(
      `https://idanlsocialapi.onrender.com/users/${user._id}/updatesocial`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const data = await response.json();
    setUser(data);

    dispatch(
      setSocial({
        network: reqBody.network,
        handle: reqBody.handle,
      })
    );
  };

  return (
    <>
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* Twitter */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontWeight="500">
                <Link
                  target="_blank"
                  underline="hover"
                  color="inherit"
                  href={`https://twitter.com/${twitterHandle}`}
                >
                  {`twitter.com/${twitterHandle}`}
                </Link>
              </Typography>
            </Box>
          </FlexBetween>
          <IconButton
            onClick={() => setIsShowTwitterEditField((prev) => !prev)}
          >
            <EditOutlined sx={{ color: medium }} />
          </IconButton>
        </FlexBetween>
        {isShowTwitterEditField && (
          <InputBase
            placeholder="Type your Twitter handle"
            onChange={(e) => setTwitterHandle(e.target.value)}
            value={twitterHandle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSocialHandle(() => {
                  setIsShowTwitterEditField(false);
                  return {
                    network: "twitter",
                    handle: twitterHandle,
                  };
                });
              }
            }}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              m: "1rem 0",
              padding: "0.25rem 2rem",
            }}
          />
        )}

        {/* LinkedIn */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedIn" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium} fontWeight="500">
                <Link
                  target="_blank"
                  underline="hover"
                  color="inherit"
                  href={`https://linkedin.com/in/${linkedInHandle}`}
                >
                  {`linkedin.com/in/${linkedInHandle}`}
                </Link>
              </Typography>
            </Box>
          </FlexBetween>

          <IconButton
            onClick={() => setIsShowLinkedInEditField((prev) => !prev)}
          >
            <EditOutlined sx={{ color: medium }} />
          </IconButton>
        </FlexBetween>
        {isShowLinkedInEditField && (
          <InputBase
            placeholder="Type your LinkedIn handle"
            onChange={(e) => setLinkedInHandle(e.target.value)}
            value={linkedInHandle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSocialHandle(() => {
                  setIsShowLinkedInEditField(false);
                  return {
                    network: "linkedIn",
                    handle: linkedInHandle,
                  };
                });
              }
            }}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              mt: "1rem",
              padding: "0.25rem 2rem",
            }}
          />
        )}
      </Box>
    </>
  );
};
