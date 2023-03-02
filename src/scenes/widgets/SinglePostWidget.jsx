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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../state";

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

  const deletePost = async () => {
    const response = await fetch(
      `https://idanlsocialapi.onrender.com/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const posts = await response.json();
    posts.reverse();
    dispatch(setPosts({ posts }));
  };
  const patchLike = async () => {
    const response = await fetch(
      `https://idanlsocialapi.onrender.com/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();

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
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://idanlsocialapi.onrender.com/assets/${picturePath}`}
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
