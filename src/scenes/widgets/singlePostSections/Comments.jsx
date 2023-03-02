import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/state";

const Comments = ({ postUserId, postId, comments, name }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id); //the current logged-in user
  const postByLoggedInUser = postUserId === loggedInUserId;

  const { palette } = useTheme();
  const main = palette.neutral.main;

  //update post by removing comment
  const delComment = async (index) => {
    const response = await fetch(
      `https://idanlsocialapi.onrender.com/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ indexToDel: index }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Box mt="0.5rem">
      {comments.map((comment, index) => (
        <Box key={`${name}-${index}`}>
          <Divider />
          <FlexBetween>
            <Typography
              sx={{
                color: main,
                m: "0.5rem 0",
                pl: "1rem",
              }}
            >
              {comment}
            </Typography>
            {postByLoggedInUser && (
              <IconButton onClick={() => delComment(index)}>
                <DeleteOutlineOutlined />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      ))}
    </Box>
  );
};

export default Comments;
