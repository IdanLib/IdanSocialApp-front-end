import { useTheme, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/state";

const AddComment = ({ postId, setIsComments }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState("");

  const { palette } = useTheme();

  //Update post with new comment
  const submitComment = async () => {
    const response = await fetch(
      `https://idanlsocialapi.onrender.com/posts/${postId}/addcomment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
    setIsComments(true);
  };

  return (
    <>
      <InputBase
        placeholder="Add a comment. Press Enter to submit."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitComment();
          }
        }}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          margin: "1rem 0",
          padding: "0.75rem 2rem",
        }}
      />
    </>
  );
};

export default AddComment;
