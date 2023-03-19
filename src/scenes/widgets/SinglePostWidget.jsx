import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlineOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@mui/icons-material";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import ShareButtons from "./singlePostSections/ShareButtons";
import Comments from "./singlePostSections/Comments";
import AddComment from "./singlePostSections/AddComment";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../state";
import { api } from "@/api/api.js";

const SinglePostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isShowDeletePostMenu, setIsShowDeletePostMenu] = useState(false);
  const [isShowShareOptions, setIsShowShareOptions] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id); //the current logged-in user
  const isLiked = Boolean(likes[loggedInUserId]); //if logged-in user has liked the post or not
  const likesCount = Object.keys(likes).length;
  const postByLoggedInUser = postUserId === loggedInUserId;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddszkagqm",
    },
  });

  const postImage = cld.image(`friends-of-idan-app/${picturePath}`);

  const deletePost = async () => {
    const posts = await api.deletePost(postId, token);
    posts.reverse();
    dispatch(setPosts({ posts }));
  };

  const patchLike = async () => {
    const updatedPost = await api.patchLike(postId, loggedInUserId, token);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <AdvancedImage
          cldImg={postImage}
          width="100%"
          height="auto"
          alt="post image"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined
                  sx={{
                    color: primary,
                  }}
                />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments((prev) => !prev)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          {postByLoggedInUser && (
            <FlexBetween gap="0.3rem">
              <IconButton
                onClick={() => setIsShowDeletePostMenu((prev) => !prev)}
              >
                <DeleteOutlineOutlined />
              </IconButton>
            </FlexBetween>
          )}
          {isShowDeletePostMenu && (
            <FlexBetween gap="0.3rem">
              <Typography mr="1rem">Delete Post?</Typography>
              <IconButton color="success" onClick={() => deletePost()}>
                <CheckOutlined />
              </IconButton>
              <IconButton
                color="warning"
                onClick={() => setIsShowDeletePostMenu((prev) => !prev)}
              >
                <CloseOutlined />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        <IconButton onClick={() => setIsShowShareOptions((prev) => !prev)}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Box mt="0.5rem">
        {isShowShareOptions && <ShareButtons description={description} />}
      </Box>
      {postByLoggedInUser && (
        <AddComment postId={postId} setIsComments={setIsComments} />
      )}
      {isComments && (
        <Comments
          postUserId={postUserId}
          postId={postId}
          comments={comments}
          name={name}
        />
      )}
    </WidgetWrapper>
  );
};

export default SinglePostWidget;
